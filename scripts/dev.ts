import { execSync, spawn } from 'child_process';
import dayjs from 'dayjs';
import { writeFileSync } from 'fs';
import { platform } from 'os';
import { join } from 'path';

/**
 * 개발 환경에서 Vite 서버를 실행하고 로그를 이쁘게 표시하는 스크립트
 *
 * 기능:
 * 1. Vite 개발 서버 실행
 * 2. 브라우저 자동 실행
 * 3. API 로그 컬러 출력
 *   - [요청]/[응답] 태그 구분
 *   - HTTP 메서드별 색상 구분
 *   - URL 경로 구분
 *   - 에러 강조
 *
 * 사용법:
 * 1. yarn dev (또는 npm run dev)
 *
 * 주의사항:
 * 1. 터미널이 자동으로 열리지 않을 경우 터미널 접근 권한 확인
 * 2. 기존에 실행 중인 Vite 서버가 있다면 종료 후 실행
 */
// 기존 프로세스 정리
function cleanupProcesses() {
  try {
    if (platform() === 'win32') {
      execSync('taskkill /F /IM node.exe');
    } else {
      execSync('pkill -f "node.*server.mjs"');
      execSync('pkill -f vite');
    }
  } catch (error) {
    // 프로세스가 없는 경우 무시
  }
}

function getTerminalCommand(): { command: string; args: string[] } {
  const currentPath = process.cwd();

  const serverScript = `
    import express from 'express';
    import cors from 'cors';
    import { spawn } from 'child_process';
    import dayjs from 'dayjs';
    import http from 'http';

    let currentPort = null;
    let isFirstLog = true;
    const vitePortRegex = /localhost:(\\d+)/;

    function stripAnsi(str) {
      return str.replace(/\\x1B[[(?);]{0,2}(;?\\d)*./g, "");
    }

    function openBrowser(url) {
      let command;
      let args;

      switch (process.platform) {
        case "darwin":
          command = "open";
          args = [url];
          break;
        case "win32":
          command = "cmd";
          args = ["/c", "start", "", url];
          break;
        default:
          console.log("지원하지 않는 플랫폼입니다. 직접 브라우저를 여세요", url);
          return;
      }

      spawn(command, args, {
        stdio: "inherit",
        shell: process.platform === "win32",
      });
      console.log(\`\\n---------------------- Browser is opened. HAPPY HACKING ----------------------\`);
    }

    function checkServer() {
      if (currentPort === null || currentPort <= 0 || currentPort > 65535) {
        console.log("유효한 Vite 포트를 찾지 못했습니다. 다시 시도 중...");
        setTimeout(checkServer, 1000);
        return;
      }

      const url = \`http://localhost:\${currentPort}\`;

      http
        .get(url, (res) => {
          console.log("로컬 호출");
          if (res.statusCode === 200) {
            console.log("로컬 응답 완료\\n\\nopenBrowser 요청 중...");
            openBrowser(url);

            // Express 서버 시작
            startExpressServer();
          } else {
            console.log(
              \`로컬 응답 실패. 다시 시도 중... \${currentPort} | 응답:\`,
              res.statusCode
            );
            setTimeout(checkServer, 2000);
          }
        })
        .on("error", (err) => {
          console.error(\`서버 연결 오류 (포트 \${currentPort}):\`, err.message);
          setTimeout(checkServer, 1000);
        });
    }

    // Vite 서버 시작
    const vite = spawn("npx", ["vite"], {
      stdio: ["inherit", "pipe", "inherit"],
      shell: process.platform === "win32",
    });

    function startExpressServer() {
      const app = express();
      app.use(cors());
      app.use(express.json());

      app.post('/__console_log', (req, res) => {
        const { args } = req.body;
        console.log(...args);
        res.send('OK');
      });

      app.listen(3030, () => {
        console.log('\\x1b[32m%s\\x1b[0m', '로그 서버 시작됨 (포트: 3030)');
      });
    }

    vite.stdout.on("data", (data) => {
      const output = stripAnsi(data.toString());

      if (isFirstLog) {
        console.log(
          "---------------------- vite서버 시작",
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "----------------------\\n"
        );
        isFirstLog = false;
      }

      const match = output.match(vitePortRegex);
      if (match && currentPort === null) {
        currentPort = parseInt(match[1], 10);
        if (currentPort > 0 && currentPort < 65536) {
          console.log(\`Vite 실행 확인 : \${currentPort}포트에서 실행 중입니다.\\n\`);
          checkServer();
        } else {
          console.log(\`유효하지 않은 포트 번호: \${currentPort}\`);
          currentPort = null;
        }
      }
    });

    process.on("SIGINT", () => {
      vite.kill();
      process.exit();
    });
  `;

  const scriptPath = join(currentPath, 'server.mjs');
  writeFileSync(scriptPath, serverScript);

  switch (platform()) {
    case 'darwin':
      return {
        command: 'osascript',
        args: ['-e', `tell application "Terminal" to do script "cd '${currentPath}' && node '${scriptPath}'"`],
      };
    case 'win32':
      return {
        command: 'cmd.exe',
        args: ['/c', 'start', 'cmd', '/k', `cd "${currentPath}" && node "${scriptPath}"`],
      };
    default:
      return {
        command: 'x-terminal-emulator',
        args: ['-e', `bash -c "cd '${currentPath}' && node '${scriptPath}'; exec bash"`],
      };
  }
}

// 기존 프로세스 정리
cleanupProcesses();

// 새 터미널에서 서버 시작
setTimeout(() => {
  const { command, args } = getTerminalCommand();
  const terminal = spawn(command, args, {
    stdio: 'inherit',
    shell: platform() === 'win32',
  });

  process.on('SIGINT', () => {
    terminal.kill();
    cleanupProcesses();
    console.log('\n--------------- process killed ---------------\n' + dayjs().format('YYYY-MM-DD HH:mm:ss') + '\n');
    process.exit();
  });
}, 1000);
