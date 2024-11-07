/**
 * 헤더 객체의 타입
 * @type HeaderObj
 */
type HeaderObj = {
  /** 헤더 제목 */
  title?: string;
  /** 창 닫기 타입 ('C': close, 'B': back) */
  closeType?: 'C' | 'B';
  /** 배경 투명 처리 여부 */
  transparent?: 'Y' | 'N';
  /** 웹뷰 History Back 사용 여부 (iOS에서는 사용 안함) */
  useHistoryBack?: 'Y' | 'N';
};

/**
 * 챌린지 정보 타입
 * @type ChallengeInfo
 */
type ChallengeInfo = {
  /** 챌린지 시퀀스 */
  seq: number;
  /** 챌린지 타입 */
  type: 1 | 2 | 3 | 5 | 6;
  /** 챌린지 참여 코드 */
  joinCode: string;
  /** 챌린지 상태 */
  status: 'R' | 'D' | 'W' | 'P' | 'E';
};

/**
 * 앱과 웹 간의 인터페이스를 제공하는 webviewbridge 클래스
 * @class webviewbridge
 */
class webviewbridge {
  private static instance: webviewbridge;

  private constructor() {}

  /**
   * webviewbridge 싱글톤 인스턴스 반환
   * @returns {webviewbridge} webviewbridge 인스턴스
   */
  public static getInstance(): webviewbridge {
    if (!webviewbridge.instance) {
      webviewbridge.instance = new webviewbridge();
    }
    return webviewbridge.instance;
  }

  /**
   * 네이티브 함수 호출
   * @private
   * @param {string} functionName - 호출할 네이티브 함수 이름
   * @param {any} args - 네이티브 함수에 전달할 인자
   */
  private callNative(functionName: string, args: any): void {
    if ((window as any).webkit && (window as any).webkit.messageHandlers) {
      // iOS
      (window as any).webkit.messageHandlers[functionName].postMessage(args);
    } else if ((window as any).Android) {
      // Android
      (window as any).Android[functionName](JSON.stringify(args));
    } else {
      console.warn('Native function not available:', functionName);
    }
  }

  /**
   * 새로운 웹뷰 호출.
   * @param {('I'|'O')} type - 브라우저 호출 타입 ('I': 앱 내부 웹뷰, 'O': 디바이스 내 내장 브라우저)
   * @param {string} url - 호출 URL
   * @param {HeaderObj} headerObj - 헤더 객체
   * @param {string} [extraParam] - 추가 파라미터
   * @param {string} [parentCloseYn] - 부모창 닫기 여부
   */
  public openWebPage(
    type: 'I' | 'O',
    url: string,
    headerObj: HeaderObj,
    extraParam?: string,
    parentCloseYn?: string,
  ): void {
    this.callNative('openWebPage', {
      type,
      url,
      headerObj,
      extraParam,
      parentCloseYn,
    });
  }

  /**
   * Native 웹뷰를 close
   * @param {string} [gubun] - 창 종료 시 하위창 컨트롤을 위한 파라미터
   */
  public close(gubun?: string): void {
    this.callNative('close', { gubun });
  }

  /**
   * 클립보드로 문자열 복사.
   * @param {string} value - 클립보드로 복사할 문자열
   * @param {function} callback - 복사 완료 후 호출될 콜백 함수
   */
  public toClipBoard(value: string, callback: (result: any) => void): void {
    const callbackId = `toClipBoard_${Date.now()}`;
    (window as any)[callbackId] = callback;
    this.callNative('toClipBoard', { callbackId, value });
  }

  /**
   * 화면 캡처.
   * @param {function} callback - 캡처 완료 후 호출될 콜백 함수
   */
  public takeCapture(callback: (result: 'Y' | 'N') => void): void {
    const callbackId = `takeCapture_${Date.now()}`;
    (window as any)[callbackId] = callback;
    this.callNative('takeCapture', { callbackId });
  }

  /**
   * 본인인증 화면 open
   */
  public openAuth(): void {
    this.callNative('openAuth', {});
  }

  /**
   * 이벤트 기록
   * @param {string} trackingCode - 이벤트 구분 코드
   * @param {Record<string, string>} params - 이벤트 기록 시 포함할 데이터
   */
  public sendAnalytics(trackingCode: string, params: Record<string, string>): void {
    this.callNative('sendAnalytics', { trackingCode, params });
  }

  /**
   * 화면 이벤트 기록
   * @param {string} screenName - 화면 이름
   */
  public sendAnalyticsScreenView(screenName: string): void {
    this.callNative('sendAnalyticsScreenView', { screenName });
  }

  /**
   * 특정 탭으로 이동
   * @param {string} tabCode - 이동할 탭 코드
   * @param {ChallengeInfo} [challengeInfo] - 챌린지 정보 (챌린지 상세 페이지일 경우)
   * @param {string} [linkUrl] - 이동할 링크 URL (선택사항)
   */
  public goNativeTab(tabCode: string, challengeInfo?: ChallengeInfo, linkUrl?: string): void {
    this.callNative('goNativeTab', { tabCode, challengeInfo, linkUrl });
  }

  /**
   * 특정 챌린지 정보 화면으로 이동
   * @param {ChallengeInfo} challengeInfo - 챌린지 정보
   */
  public goChallengeInfo(challengeInfo: ChallengeInfo): void {
    this.callNative('goChallengeInfo', { challengeInfo });
  }

  /**
   * 웹 페이지 내비게이션 수행
   * @param {('I')} type - 브라우저 호출 타입 ('I': 앱 내부 웹뷰)
   * @param {string} url - 호출 URL
   * @param {string} [extraParam] - 추가 파라미터
   */
  public navigateWeb(type: 'I', url: string, extraParam?: string): void {
    this.callNative('navigateWeb', { type, url, extraParam });
  }

  /**
   * 구매 완료 신호 전달
   */
  public purchaseCompleted(): void {
    this.callNative('purchaseCompleted', {});
  }

  /**
   * 오퍼월 실행
   * @param {string} [offerwallType] - 실행할 오퍼월 유형
   */
  public openOfferwall(offerwallType?: string): void {
    this.callNative('openOfferwall', { offerwallType });
  }

  /**
   * 오퍼월 총 보상을 요청
   * @param {string} type - 오퍼월 유형
   * @param {function} callback - 총 보상 정보를 받을 콜백 함수
   */
  public offerwallTotalReward(type: string, callback: (data: any) => void): void {
    const callbackId = `offerwallTotalReward_${Date.now()}`;
    (window as any)[callbackId] = callback;
    this.callNative('offerwallTotalReward', { type, callbackId });
  }

  /**
   * 약관 동의 철회에 따른 처리를 수행
   * @param {string} type - 동의 철회한 약관 유형
   */
  public withdrawPolicies(type: string): void {
    this.callNative('withdrawPolicies', { type });
  }

  /**
   * 쿠팡 모아보기 설치 (Android 전용)
   */
  public makeCoupangShortcut(): void {
    this.callNative('makeCoupangShortcut', {});
  }

  /**
   * 쿠팡 모아보기 설치 여부 확인 (Android 전용)
   * @param {function} callback - 설치 여부를 받을 콜백 함수
   */
  public isExistCoupangShortcut(callback: (result: 'Y' | 'N') => void): void {
    const callbackId = `isExistCoupangShortcut_${Date.now()}`;
    (window as any)[callbackId] = callback;
    this.callNative('isExistCoupangShortcut', { callbackId });
  }

  /**
   * adpie 비디오 광고 실행
   * @param {string} slotId - 비디오 광고를 보여줄 지면 id
   * @param {string} type - 비디오 광고 유형
   * @param {string} trackingLabel - airbridge event tracking시 사용하는 label값
   * @param {function} callback - 광고 결과를 받을 콜백 함수
   */
  public adpieVideoAd(slotId: string, type: string, trackingLabel: string, callback: (result: any) => void): void {
    const callbackId = `adpieVideoAd_${Date.now()}`;
    (window as any)[callbackId] = callback;
    this.callNative('adpieVideoAd', {
      slotId,
      type,
      trackingLabel,
      callbackId,
    });
  }

  /**
   * 약관 동의 화면 종료 시 동작 수행
   * @param {string} source - 약관 유형
   * @param {string} beginFlag - 챌린지 시작 유형
   * @param {string} challengeJoinCode - 챌린지 참여 코드
   * @param {number} fee - 챌린지 참여시 필요 포인트
   * @param {number} point - 잔여 포인트
   */
  public closeWebTermAgreement(
    source: string,
    beginFlag: string,
    challengeJoinCode: string,
    fee: number,
    point: number,
  ): void {
    this.callNative('closeWebTermAgreement', {
      source,
      beginFlag,
      challengeJoinCode,
      fee,
      point,
    });
  }

  /**
   * 계정찾기 완료 시 Native 웹뷰 close (Android 전용)
   * @param {string} result - 처리 결과
   * @param {string} nickname - 별명 (계정찾기 성공 시에만 포함)
   * @param {any[]} accounts - 계정 정보 배열
   */
  public closeWithAccountInfo(result: string, nickname: string, accounts: any[]): void {
    this.callNative('closeWithAccountInfo', { result, nickname, accounts });
  }

  /**
   * Native 웹뷰 close (파라미터 포함)
   * @param {string} result - 처리 결과
   * @param {string} [refresh_token] - 로그인 리프레시 토큰 (계정 통합 성공 시에만 포함)
   */
  public closeWeb(result: string, refresh_token?: string): void {
    this.callNative('closeWeb', { result, refresh_token });
  }

  /**
   * Native 웹뷰 닫으며 페이지 리로드
   */
  public closeWithMainReload(): void {
    this.callNative('closeWithMainReload', {});
  }

  /**
   * 연락처 동기화
   * @param {function} callback - 동기화 결과 받을 콜백 함수
   */
  public phonebookSync(callback: (result: any) => void): void {
    const callbackId = `phonebookSync_${Date.now()}`;
    (window as any)[callbackId] = callback;
    this.callNative('phonebookSync', { callbackId });
  }

  /**
   * 웹 페이지 공유
   * @param {string} url - 공유할 링크
   * @param {string} description - 공유할 url에 대한 설명
   */
  public shareWebPage(url: string, description: string): void {
    this.callNative('shareWebPage', { url, description });
  }

  /**
   * 회원가입 화면으로 이동 (iOS 전용)
   */
  public goSignUp(): void {
    this.callNative('goSignUp', {});
  }

  /**
   * 웹뷰 네비게이션 타이틀 설정 (iOS 전용)
   * @param {string} title - 네비게이션 타이틀
   */
  public setTitle(title: string): void {
    this.callNative('setTitle', { title });
  }

  /**
   * 외부 브라우저 open (iOS 전용)
   * @param {string} url - 오픈할 페이지 링크
   */
  public outLink(url: string): void {
    this.callNative('outLink', { url });
  }

  /**
   * 헤더 데이터를 콜웹으로 전달 (iOS 전용)
   * @param {function} callback - 헤더 데이터를 받을 콜백 함수
   */
  public requestHeader(callback: (data: any) => void): void {
    const callbackId = `requestHeader_${Date.now()}`;
    (window as any)[callbackId] = callback;
    this.callNative('requestHeader', { callbackId });
  }

  /**
   * 웹에서 갱신된 토큰을 앱에 저장 (iOS 전용)
   * @param {string} authToken - 갱신된 인증 토큰
   */
  public refreshToken(authToken: string): void {
    this.callNative('refreshToken', { authToken });
  }

  /**
   * 웹페이지 리다이렉트 시 실행할 funeasy의 자바스크립트 코드 설정
   * @param {string} code - 실행할 자바스크립트 코드
   */
  public funeasyExcuteInApp(code: string): void {
    this.callNative('funeasyExcuteInApp', { code });
  }

  /**
   * 네이티브 기기 내의 다른 앱 또는 웹(기본 브라우저) 실행
   * @param {string} url - 실행할 주소
   */
  public funeasyOpenIntent(url: string): void {
    this.callNative('funeasyOpenIntent', { url });
  }

  /**
   * funeasy를 위해 다른 앱에서 공유받은 데이터 초기화
   */
  public clearFuneasyData(): void {
    this.callNative('clearFuneasyData', {});
  }

  /**
   * 자식 웹뷰를 종료하며 부모 웹뷰에서 지정된 자바스크립트 함수 실행
   * @param {string} funcName - 부모 웹뷰에서 실행할 자바스크립트 함수의 이름
   */
  public callParentFunc(funcName: string): void {
    this.callNative('callParentFunc', { funcName });
  }

  /**
   * 네이티브에서 호출한 콜백 처리
   * @static
   * @param {any} args - 콜백 인자
   */
  public static processCallback(args: any): void {
    const { callbackId, ...rest } = args;
    if (callbackId && typeof (window as any)[callbackId] === 'function') {
      (window as any)[callbackId](rest);
      delete (window as any)[callbackId];
    }
  }

  /**
   * Native webView의 상태가 resume을 거쳤을 경우 웹의 onResume 함수 호출
   * @param {string} value - close callApp 함수에서 받은 gubun 필드값
   */
  public static sendResumeToWebView(value: string): void {
    if (typeof (window as any).onResume === 'function') {
      (window as any).onResume(value);
    }
  }

  /**
   * funeasy로 정답 제출
   * @param {string} data - 사용자가 제출하고자 하는 정답
   */
  public static funeasySendAnswer(data: string): void {
    if (typeof (window as any).funeasySendAnswer === 'function') {
      (window as any).funeasySendAnswer(data);
    }
  }

  /**
   * 기기에서 백버튼 이벤트 발생 시 funeasy 동작 수행.
   */
  public static funeasyGoback(): void {
    if (typeof (window as any).funeasyGoback === 'function') {
      (window as any).funeasyGoback();
    }
  }

  /**
   * 네이티브 상태 변경 시 funeasy에서 제공받은 자바스크립트 코드 실행
   * @param {string} code - funeasyExcuteInApp callApp을 통해 제공받은 자바스크립트 코드
   */
  public static executeFuneasyCode(code: string): void {
    try {
      new Function(code)();
    } catch (error) {
      console.error('Error executing funeasy code:', error);
    }
  }
}

export default webviewbridge.getInstance();
