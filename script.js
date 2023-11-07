main();

function main() {
  const isLocalhost = window.location.hostname.includes('localhost');

  const logger = {
    success(message, isTitle = false) {
      console.info(
        `%c${message}`,
        `color: ${isTitle ? '#17C964' : '#74DFA2'}; font-weight: ${
          isTitle ? 'bold' : 'normal'
        };`
      );
    },
    warn(message, isTitle = false) {
      console.info(
        `%c${message}`,
        `color: ${isTitle ? '#F5A524' : '#F9C97C'}; font-weight: ${
          isTitle ? 'bold' : 'normal'
        };`
      );
    },
  };

  if (!isLocalhost) {
    login();
  } else {
    // We need to wait for the user to click the screen.
    // Otherwise, the cookie will not be added automatically.
    // That is because cookie is being read from the clipboard.
    // https://stackoverflow.com/questions/56306153/domexception-on-calling-navigator-clipboard-readtext
    window.setTimeout(addCookie, 3000);
  }

  function login() {
    const LoginUrl =
      'https://accounts.saqafdg.com/bapi/accounts/v2/public/authcenter/login';

    // You can get the payload from the network tab when logging in manually.
    const Payload = {
      email: 'yiyop10630@glalen.com',
      password: '872434a9b971dc5077d3d96734ac59c5',
      safePassword:
        'cbe0cd68cbca3868250c0ba545c48032f43eb0e8a5e6bab603d109251486f77a91e46a3146d887e37416c6bdb6cbe701bd514de778573c9b0068483c1c626aec',
      sessionId: '2868c1d7-272c-4e45-89c7-39b413fc72e7',
      validateCodeType: 'gt',
      captchaType: null,
      geetestChallenge: 'ee3488f3b238c4d77a3d9e2b151763c0',
      geetestValidate: '79850e2195cbc26a249d91af9d684f76',
      geetestSeccode: '79850e2195cbc26a249d91af9d684f76|jordan',
      challenge: 'ee3488f3b238c4d77a3d9e2b151763c0',
      gt: 'fd2af7df400d95e5ba5166f5e98add8c',
      gtId: '9b08f8e5-9880-46e9-9a74-2ff6d46ec9aa',
      deviceInfo:
        'eyJzY3JlZW5fcmVzb2x1dGlvbiI6Ijg0NCwzOTAiLCJhdmFpbGFibGVfc2NyZWVuX3Jlc29sdXRpb24iOiI4NDQsMzkwIiwic3lzdGVtX3ZlcnNpb24iOiJpT1MgMTMuMi4zIiwiYnJhbmRfbW9kZWwiOiJtb2JpbGUgQXBwbGUgaVBob25lICIsInN5c3RlbV9sYW5nIjoiZW4tVVMiLCJ0aW1lem9uZSI6IkdNVCs0IiwidGltZXpvbmVPZmZzZXQiOi0yNDAsInVzZXJfYWdlbnQiOiJNb3ppbGxhLzUuMCAoaVBob25lOyBDUFUgaVBob25lIE9TIDEzXzJfMyBsaWtlIE1hYyBPUyBYKSBBcHBsZVdlYktpdC82MDUuMS4xNSAoS0hUTUwsIGxpa2UgR2Vja28pIFZlcnNpb24vMTMuMC4zIE1vYmlsZS8xNUUxNDggU2FmYXJpLzYwNC4xIiwibGlzdF9wbHVnaW4iOiIiLCJjYW52YXNfY29kZSI6IjAyNzUwMDM4Iiwid2ViZ2xfdmVuZG9yIjoiR29vZ2xlIEluYy4gKEFwcGxlKSIsIndlYmdsX3JlbmRlcmVyIjoiQU5HTEUgKEFwcGxlLCBBcHBsZSBNMSBQcm8sIE9wZW5HTCA0LjEpIiwiYXVkaW8iOiIxMjQuMDQzNDQ5Njg0NzUxOTgiLCJwbGF0Zm9ybSI6Ik1hY0ludGVsIiwid2ViX3RpbWV6b25lIjoiQXNpYS9EdWJhaSIsImRldmljZV9uYW1lIjoiTW9iaWxlIFNhZmFyaSBWMTMuMC4zIChpT1MpIiwiZmluZ2VycHJpbnQiOiI2ZTQ0MzlmYzIxZTllNjQzZDYwOTg5YzU0ZjI0MDIzYSIsImRldmljZV9pZCI6IjE2OTkyNzYyNjg5MjNHZmZ5ZnhJTjV6ODk4MmpPVXlaIiwicmVsYXRlZF9kZXZpY2VfaWRzIjoiIn0=',
      isNewLoginProcess: true,
    };

    fetch(LoginUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const cookie = 'cr00=' + json.data.csrfToken;
        copy('document.cookie="' + cookie + '"');

        logger.success('✅ Cookie has been copied to your clipboard!', true);
        logger.success(
          'Now navigate to localhost and run the script again or paste the cookie manually.'
        );
        logger.success('document.cookie="' + cookie + '"');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function copy(text) {
    let textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    textarea.value = text;
    textarea.select();
    document.execCommand('copy', true);
    document.body.removeChild(textarea);
  }

  async function addCookie() {
    let cookie;

    try {
      cookie = await navigator.clipboard.readText();
      document.cookie = cookie;
      logger.success('%c🎉 Cookie has been added!', 'color: #5cb85c;');
    } catch {
      logger.warn(
        '❗️❗️❗️ You should double click anywhere on the webpage within 3 seconds after running the script.',
        true
      );
      logger.warn(
        'If you keep getting this error you can add cookies from your clipboard.'
      );
      logger.warn('Just paste (CTRL + V or CMD + V) the cookie and hit Enter.');
    }
  }
}
