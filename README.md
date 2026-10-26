@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #020817 0%, #0b1120 30%, #111827 100%);
  color: #e2e8f0;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

button,
input,
select {
  font: inherit;
}

::selection {
  background: rgba(59, 130, 246, 0.45);
}
