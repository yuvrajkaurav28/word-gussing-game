const API = "/api";

// Redirect if already logged in
if (localStorage.getItem("wq_user")) {
  window.location.href = "/home";
}

function switchTab(tab) {
  const loginForm    = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginTab     = document.getElementById("loginTab");
  const registerTab  = document.getElementById("registerTab");

  if (tab === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById("loginUser").value.trim();
  const password  = document.getElementById("loginPass").value;
  const msg       = document.getElementById("loginMsg");

  msg.textContent = "Logging in...";
  msg.className   = "auth-msg";

  try {
    const res  = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("wq_user",     data.username);
      localStorage.setItem("wq_progress", JSON.stringify(data.progress));
      msg.textContent = "Welcome back!";
      msg.className   = "auth-msg success";
      setTimeout(() => { window.location.href = "/home"; }, 600);
    } else {
      msg.textContent = data.error || "Login failed";
      msg.className   = "auth-msg error";
    }
  } catch {
    msg.textContent = "Cannot connect to server. Make sure the backend is running.";
    msg.className   = "auth-msg error";
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById("regUser").value.trim();
  const password  = document.getElementById("regPass").value;
  const msg       = document.getElementById("registerMsg");

  if (username.length < 3) {
    msg.textContent = "Username must be at least 3 characters";
    msg.className   = "auth-msg error";
    return;
  }
  if (password.length < 4) {
    msg.textContent = "Password must be at least 4 characters";
    msg.className   = "auth-msg error";
    return;
  }

  msg.textContent = "Creating account...";
  msg.className   = "auth-msg";

  try {
    const res  = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      msg.textContent = "Account created! Logging you in...";
      msg.className   = "auth-msg success";
      setTimeout(() => handleLoginDirect(username, password), 800);
    } else {
      msg.textContent = data.error || "Registration failed";
      msg.className   = "auth-msg error";
    }
  } catch {
    msg.textContent = "Cannot connect to server.";
    msg.className   = "auth-msg error";
  }
}

async function handleLoginDirect(username, password) {
  try {
    const res  = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("wq_user",     data.username);
      localStorage.setItem("wq_progress", JSON.stringify(data.progress));
      window.location.href = "/home";
    } else {
      document.getElementById("registerMsg").textContent = "Auto-login failed. Please login manually.";
      document.getElementById("registerMsg").className   = "auth-msg error";
      switchTab("login");
    }
  } catch {
    document.getElementById("registerMsg").textContent = "Server error. Please login manually.";
    document.getElementById("registerMsg").className   = "auth-msg error";
    switchTab("login");
  }
}
