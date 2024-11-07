
    import express from 'express';
    import cors from 'cors';
    import { spawn } from 'child_process';
    import dayjs from 'dayjs';
    import http from 'http';

    let currentPort = null;
    let isFirstLog = true;
    const vitePortRegex = /localhost:(\d+)/;

    function stripAnsi(str) {
      return str.replace(/\x1B[[(?);]{0,2}(;?\d)*./g, "");
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
      console.log(`\n---------------------- Browser is opened. HAPPY HACKING ----------------------`);
    }

    function checkServer() {
      if (currentPort === null || currentPort <= 0 || currentPort > 65535) {
        console.log("유효한 Vite 포트를 찾지 못했습니다. 다시 시도 중...");
        setTimeout(checkServer, 1000);
        return;
      }

      const url = `http://localhost:${currentPort}`;

      http
        .get(url, (res) => {
          console.log("로컬 호출");
          if (res.statusCode === 200) {
            console.log("로컬 응답 완료\n\nopenBrowser 요청 중...");
            openBrowser(url);

            // Express 서버 시작
            startExpressServer();
          } else {
            console.log(
              `로컬 응답 실패. 다시 시도 중... ${currentPort} | 응답:`,
              res.statusCode
            );
            setTimeout(checkServer, 2000);
          }
        })
        .on("error", (err) => {
          console.error(`서버 연결 오류 (포트 ${currentPort}):`, err.message);
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
        console.log('\x1b[32m%s\x1b[0m', '로그 서버 시작됨 (포트: 3030)');
      });
    }

    vite.stdout.on("data", (data) => {
      const output = stripAnsi(data.toString());

      if (isFirstLog) {
        console.log(
          "---------------------- vite서버 시작",
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "----------------------\n"
        );
        isFirstLog = false;
      }

      const match = output.match(vitePortRegex);
      if (match && currentPort === null) {
        currentPort = parseInt(match[1], 10);
        if (currentPort > 0 && currentPort < 65536) {
          console.log(`Vite 실행 확인 : ${currentPort}포트에서 실행 중입니다.\n`);
          checkServer();
        } else {
          console.log(`유효하지 않은 포트 번호: ${currentPort}`);
          currentPort = null;
        }
      }
    });

    process.on("SIGINT", () => {
      vite.kill();
      process.exit();
    });
  