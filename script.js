// Theme Handling
const themeBtn = document.querySelector('.theme-toggle-btn');
const themeIcon = themeBtn.querySelector('i');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.toggle('dark-theme');
    themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Toggle the icon between moon and sun
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
        localStorage.setItem('theme', 'light');
    }
});

// Dynamic wallpaper handling
const appBackground = document.querySelector('.viewport');

const updateWallpaper = (hour) => {
  let imageUrl = '';

  if (hour >= 5 && hour < 8) {
    imageUrl = './images/morning.jpg';
  } else if (hour >= 8 && hour < 11) {
    imageUrl = './images/late-morning.png';
  } else if (hour >= 11 && hour < 14) {
    imageUrl = './images/afternoon.png';
  } else if (hour >= 14 && hour < 17) {
    imageUrl = './images/late-afternoon.png';
  } else if (hour >= 17 && hour < 19) {
    imageUrl = './images/evening.png';
  } else if (hour >= 19 && hour < 20) {
    imageUrl = './images/late-evening.png';
  } else if (hour >= 20 && hour <= 23) {
    imageUrl = './images/night.png';
  } else {
    imageUrl = './images/late-night.png';
  }

  appBackground.style.backgroundImage = `url('${imageUrl}')`;
};

const currentHour = new Date().getHours();
updateWallpaper(currentHour);

// dashboard card navigation
const dashboardView = document.querySelector('#view-dashboard');
const dashboardNavBtn = document.querySelector('button[data-target="view-dashboard"]');
const dashboardCards = [
    document.querySelector(`div[data-target=view-todo`),
    document.querySelector(`div[data-target=view-planner`),
    document.querySelector(`div[data-target=view-goals`),
    document.querySelector(`div[data-target=view-pomodoro`),
    document.querySelector(`div[data-target=view-weather`),
    document.querySelector(`div[data-target=view-motivation`)
];

dashboardCards.forEach((tool) => {
    tool.addEventListener('click', () => {
        const selectedTool = tool.getAttribute('data-target');
        const selectedView = document.querySelector(`#${selectedTool}`);
        const selectedViewNavBtn = document.querySelector(`button[data-target=${selectedTool}]`);
        dashboardView.classList.remove('is-fullscreen');
        dashboardView.classList.add('hidden')
        dashboardNavBtn.classList.remove('active');
        selectedView.classList.remove('hidden');
        selectedView.classList.add('is-fullscreen');
        selectedViewNavBtn.classList.add('active');
    });
})

// Navbar Navigation
const navLinks = document.querySelectorAll('.nav-item');

// - adding click listener
navLinks.forEach((item) => {
    item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('active')) {
            const previousActiveView = document.querySelector('.nav-item.active').getAttribute('data-target');
            const currActiveView = e.target.getAttribute('data-target');
            document.querySelector('.nav-item.active').classList.remove('active');
            e.target.classList.add('active');
            document.getElementById(previousActiveView).classList.remove('is-fullscreen');
            document.getElementById(previousActiveView).classList.add('hidden');
            document.getElementById(currActiveView).classList.remove('hidden');
            document.getElementById(currActiveView).classList.add('is-fullscreen');
        }
    });
});

// Greeting Message handling
const greetingElem = document.querySelector('#greeting');

function getGreetingMessage(hour) {
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
}

function updateGreeting() {
    if (!greetingElem) return;
    greetingElem.textContent = getGreetingMessage(new Date().getHours());
}

updateGreeting();

// Clock Handling
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dateElem = document.querySelector('#tb-date');
const timeElem = document.querySelector('#tb-time');

const clock = setInterval(() => {
    const now = new Date();
    const day = weekday[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    dateElem.innerHTML = `<i class="ri-calendar-line"></i> ${day} ${month} ${date}, ${year}`;
    timeElem.innerHTML = `<i class="ri-time-line"></i> ${hours > 12 ? hours%12 : hours}:${(minutes < 10 ? '0':'') + minutes} ${hours >= 12 ? 'PM' : 'AM'}`
    updateGreeting();
}, 500);

// quotes handling
let quote;
const quoteElem = document.querySelector('#quote');
const quoteAuthorElem = document.querySelector('#quote-author');
const quoteRefreshBtn = document.querySelector('.refresh-quote-btn');
const mainQuoteElem = document.querySelector('#main-quote');
const mainQuoteAuthorElem = document.querySelector('#main-quote-author');
const mainQuoteRefreshBtn = document.querySelector('#main-refresh-quote-btn');

const getQuote = async function() {
    const fetchQuote = await fetch('https://api.api-ninjas.com/v2/randomquotes', {
        method: 'GET',
        headers: {
            'X-Api-Key': 'GVfrWM0xIsiSA9y904i1ESa9njnv9RRyy9o13PCQ'
        }
    });
    quote = await fetchQuote.json();
    quote = quote[0];
    quoteElem.textContent = `"${quote.quote}"`;
    quoteAuthorElem.textContent = `- ${quote.author}`;
    mainQuoteElem.textContent = `"${quote.quote}"`;
    mainQuoteAuthorElem.textContent = `- ${quote.author}`;
}
getQuote();
quoteRefreshBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    getQuote();
});
mainQuoteRefreshBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    getQuote();
});

// weather handling
const weatherIconMap = {
    1000: 'ri-sun-fill',         // Sunny / Clear
    1003: 'ri-sun-cloudy-fill',  // Partly cloudy
    1006: 'ri-cloudy-fill',      // Cloudy
    1063: 'ri-drizzle-fill',     // Patchy rain nearby
    1183: 'ri-rainy-fill',       // Light rain
    1189: 'ri-heavy-showers-fill',// Moderate rain
    1273: 'ri-thunderstorms-fill' // Thunderstorms
};

const weatherIconElement = document.getElementById('weather-icon');
const weatherTempElement = document.getElementById('weather-temp');
const weatherStateElement = document.getElementById('weather-state');
const weatherLocationElement = document.getElementById('weather-location');

const requestLocation = function() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ lat: latitude, lon: longitude });
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error("User denied the request for Geolocation."));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error("Location information is unavailable."));
                        break;
                    case error.TIMEOUT:
                        reject(new Error("The request to get user location timed out."));
                        break;
                    default:
                        reject(new Error("An unknown error occurred."));
                        break;
                }
            }
        );
    });
}

const renderMainWeatherElement = function (data) {
    const weatherSection = document.querySelector('#view-weather');
    const weatherComponent = weatherSection.querySelector('.app-content');
    weatherComponent.innerHTML = `
        <div class="app-title justify-center">
            <div class="icon-box"><i class="ri-sun-cloudy-line"></i></div>
            <h2>Weather Details</h2>
        </div>
        <p class="app-desc text-center">Current weather conditions and forecasts for your area.</p>
        
        <!-- Primary Display -->
        <div class="weather-large-display">
            <div class="weather-icon-wrapper">
                <i class="ri-heavy-showers-line weather-hero-icon" id="weather-icon"></i>
            </div>
            <h1 class="weather-temp" id="weather-temp">${data.current.temp_c}°C</h1>
            <p class="weather-condition text-muted" id="weather-condition">${data.current.condition.text}</p>
            <p class="weather-location" id="weather-location">${data.location.name}, ${data.location.region}, ${data.location.country}</p>
            <span class="weather-badge" id="weather-feels-like">Feels like ${data.current.feelslike_c}°C</span>
        </div>
        
        <!-- Metrics Grid -->
        <div class="weather-metrics-grid">
            <div class="weather-metric">
                <span class="metric-label text-muted text-sm">
                    <i class="ri-windy-line"></i> Wind
                </span>
                <p class="metric-value" id="metric-wind">${data.current.wind_kph} kph ${data.current.wind_dir}</p>
            </div>

            <div class="weather-metric">
                <span class="metric-label text-muted text-sm">
                    <i class="ri-drop-line"></i> Humidity
                </span>
                <p class="metric-value" id="metric-humidity">${data.current.humidity}%</p>
            </div>

            <div class="weather-metric">
                <span class="metric-label text-muted text-sm">
                    <i class="ri-eye-line"></i> Visibility
                </span>
                <p class="metric-value" id="metric-visibility">${(data.current.vis_km).toFixed(1)} km</p>
            </div>

            <div class="weather-metric">
                <span class="metric-label text-muted text-sm">
                    <i class="ri-sun-line"></i> UV Index
                </span>
                <p class="metric-value" id="metric-uv">${data.current.uv.toFixed(1)}</p>
            </div>

            <div class="weather-metric">
                <span class="metric-label text-muted text-sm">
                    <i class="ri-rainy-line"></i> Precipitation
                </span>
                <p class="metric-value" id="metric-precip">${data.current.precip_mm} mm (${data.current.chance_of_rain}%)</p>
            </div>

            <div class="weather-metric">
                <span class="metric-label text-muted text-sm">
                    <i class="ri-dashboard-3-line"></i> Pressure
                </span>
                <p class="metric-value" id="metric-pressure">${data.current.pressure_mb} mb</p>
            </div>
        </div>
    `;
}

const getWeatherDetails = async function() {
    try {
        const { lat, lon } = await requestLocation();
        
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3a89ad1262ed4fceb9853919262007&q=${lat},${lon}`);
        
        let weatherInfo = await response.json();
        
        // updating weather card
        const weatherCode = weatherInfo.current.condition.code;
        const weatherState = weatherInfo.current.condition.text;
        const weatherLocation = weatherInfo.location.name + ', ' + (weatherInfo.location.region ? (weatherInfo.location.region + ', ') : '') + weatherInfo.location.country; 
        const weatherIconClass = weatherIconMap[weatherCode] || 'ri-cloud-fill'; 

        weatherIconElement.className = `${weatherIconClass} text-xl`;
        weatherTempElement.textContent = weatherInfo.current.temp_c + ' °C';
        weatherStateElement.textContent = weatherState;
        weatherLocationElement.textContent = weatherLocation;
        
        renderMainWeatherElement(weatherInfo);
    } catch (error) {
        // Catch any errors from the location request or the API fetch
        console.error("Error fetching weather:", error.message);
    }
}

getWeatherDetails();

//Back to Dashboard Button
const back2DashboardButtons = document.querySelectorAll('#back-to-dash');
back2DashboardButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const currentView = btn.parentElement.parentElement;
        const currentNavBtn = document.querySelector(`button[data-target="${currentView.getAttribute('id')}"]`);
        currentNavBtn.classList.remove('active');
        dashboardNavBtn.classList.add('active');
        currentView.classList.remove('is-fullscreen');
        currentView.classList.add('hidden');
        dashboardView.classList.remove('hidden');
        dashboardView.classList.add('is-fullscreen');
    })
});

// TO-DO List Handling
let todoList = JSON.parse(window.localStorage.getItem('todoList')) || [];
const addTaskForm = document.querySelector('#add-task-form');
const addTaskField = document.querySelector('.task-input');
const list = document.querySelector('.task-list');
const dashboardList = document.querySelector('#dash-todo-list');
const listCounter = document.querySelector('#rem-task-count');
let taskId = 1;

function removeTask(id) {
    if (window.confirm('Do you want to remove this task?') === false) return;
    const updatedTodoList = todoList.filter(task => task.id !== id);
    todoList = updatedTodoList;
    renderTodolist();
}

function markImportant(id) {
    const updatedTodoList = todoList.map(task => {
        if (task.id === id) {
            task.isImp = task.isImp ? false : true;
        }
        return task;
    });
    todoList = updatedTodoList;
    renderTodolist();
}

function markComplete(id) {
    const updatedTodoList = todoList.map(task => {
        if (task.id === id) {
            task.isComplete = task.isComplete ? false : true;
        }
        return task;
    });
    todoList = updatedTodoList;
    renderTodolist();
}

function renderTodolist() {
    let availableTasks = 0;
    if (todoList.length) {
        window.localStorage.setItem('todoList', JSON.stringify(todoList));
    }
    list.innerHTML = '';
    dashboardList.innerHTML = '';
    todoList.forEach((task) => {
        if (!task.isComplete) availableTasks++;
        list.innerHTML += `
            <li class="task-item" id="task-${task.id}">
                <h4 class="task-title ${task.isComplete ? 'completed' : ''}">${task.value}</h4>
                <div class="task-functions">
                    <button class="btn-icon important" onClick="markImportant(${task.id})"><i class="ri-star-${task.isImp ? 'fill':'line'}"></i></button>
                    <button class="btn-icon text-primary" onClick="markComplete(${task.id})"><i class="ri-checkbox${task.isComplete ? '' : '-blank'}-line"></i></button>
                    <button class="btn-icon text-danger" onCLick="removeTask(${task.id})"><i class="ri-delete-bin-line"></i></button>
                </div>
            </li>
        `;
        dashboardList.innerHTML += `
            <li class="task-item" id="task-${task.id}">
                <h4 class="task-title ${task.isComplete ? 'completed' : ''}">${task.value}</h4>
                <div class="task-functions">
                    <button class="btn-icon important" onClick="markImportant(${task.id})"><i class="ri-star-${task.isImp ? 'fill':'line'}"></i></button>
                    <button class="btn-icon text-primary" onClick="markComplete(${task.id})"><i class="ri-checkbox${task.isComplete ? '' : '-blank'}-line"></i></button>
                    <button class="btn-icon text-danger" onCLick="removeTask(${task.id})"><i class="ri-delete-bin-line"></i></button>
                </div>
            </li>
        `;
    });
    listCounter.textContent = availableTasks;
}

addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    todoList.push({ value: addTaskField.value, id: taskId, isImp: false, isComplete: false});
    renderTodolist();
    addTaskField.value = '';
    taskId++;
});

renderTodolist();

// Goals handling
let goalList = JSON.parse(localStorage.getItem('goalList')) || [];
const goalListElem = document.querySelector('#goal-list');
const goalForm = document.querySelector('#add-goal-form');
const goalField = document.querySelector('#goal-input');
const progressBars = document.querySelectorAll('.progress-fill');
const dashGoalList = document.querySelector('#dash-goal-list');
const progressText = document.querySelector('#progress-text');
const dashProgressTest = document.querySelector('#dash-progress-text');
let progress = goalList.length ? ((goalList.reduce((acc,goal) => {
    if (goal.isComplete) return acc + 1;
    return acc;
}, 0) / goalList.length) * 100) : 0;
let goalId = 1;

function markGoalComplete(id) {
    const updatedGoalList = goalList.map(goal => {
        if (goal.id === id) {
            goal.isComplete = goal.isComplete ? false : true;
        }
        return goal;
    });
    goalList = updatedGoalList;
    renderGoalList();
}

function renderGoalList(isInitial = false) {
    let goalsCompleted = 0;
    if (goalList.length && !isInitial) {
        window.localStorage.setItem('goalList', JSON.stringify(goalList));
    }
    goalListElem.innerHTML = '';
    dashGoalList.innerHTML = '';
    goalList.forEach((goal) => {
        if (goal.isComplete) goalsCompleted++;
        goalListElem.innerHTML += `
            <li id="goal-${goal.id}" class="task-item">
                <label class="task-label">
                    <input onCLick="markGoalComplete(${goal.id})" type="checkbox"${goal.isComplete ? ' checked' : ''}> <span${goal.isComplete ? ' class="completed"' : ''}>${goal.value}</span>
                </label>
            </li>
        `;
        dashGoalList.innerHTML += `
            <li id="goal-${goal.id}" class="task-item">
                <label class="task-label">
                    <input onCLick="markGoalComplete(${goal.id})" type="checkbox"${goal.isComplete ? ' checked' : ''}> <span${goal.isComplete ? ' class="completed"' : ''}>${goal.value}</span>
                </label>
            </li>
        `;
    });
    const progressPercent = !goalList.length ? 0 : ((goalsCompleted/goalList.length)*100).toFixed(2);
    dashProgressTest.textContent = `${goalsCompleted} of ${goalList.length} Completed`;
    progressText.textContent = `Overall Progress: ${progressPercent}% (${goalsCompleted} of ${goalList.length} Completed)`
    progressBars.forEach(progressBar => progressBar.style.width = progressPercent + '%');
}

goalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    goalList.push({ value: goalField.value, id: goalId, isComplete: false});
    renderGoalList();
    goalField.value = '';
    goalId++;
});

renderGoalList(true);

// Pomodoro Timer
let WorkSessionTime = Number(JSON.parse(localStorage.getItem('workSessionTime'))) || 25;
let BreakSessionTime = Number(JSON.parse(localStorage.getItem('breakSessionTime'))) || 5;

let isWorkSession = true;
let isSessionRunning = false;

let minutes = isWorkSession ? WorkSessionTime : BreakSessionTime;
let seconds = 0;

function updateSession () {
    const miniTimerText = document.getElementById('mini-timer-text');
    const miniSessionLabel = document.getElementById('mini-session-label');
    const timerText = document.getElementById('timer-text');
    const sessionLabel = document.getElementById('session-label');

    miniTimerText.textContent = `${minutes < 10 ? ('0' + minutes) : minutes}:${seconds < 10 ? ('0' + seconds) : seconds}`;
    timerText.textContent = `${minutes < 10 ? ('0' + minutes) : minutes}:${seconds < 10 ? ('0' + seconds) : seconds}`;
    miniSessionLabel.textContent = (isWorkSession ? 'Work' : 'Break') + ' Session';
    sessionLabel.textContent = (isWorkSession ? 'Work' : 'Break') + ' Session';
}

// - Increment - Decrement Timer
const incMinuteBtn = document.getElementById('increase-time');
const decMinuteBtn = document.getElementById('decrease-time');
const miniIncMinuteBtn = document.getElementById('mini-increase-time');
const miniDecMinuteBtn = document.getElementById('mini-decrease-time');

incMinuteBtn.addEventListener('click', () => {
    if (isSessionRunning) return;
    minutes += 1;
    if (isWorkSession) {
        WorkSessionTime += 1;
        localStorage.setItem('workSessionTime', JSON.stringify(WorkSessionTime));
    } else {
        BreakSessionTime += 1;
        localStorage.setItem('breakSessionTime', JSON.stringify(BreakSessionTime));
    }
    updateSession();
});

decMinuteBtn.addEventListener('click', () => {
    if (isSessionRunning) return;
    minutes -= 1;
    if (isWorkSession) {
        WorkSessionTime -= 1;
        localStorage.setItem('workSessionTime', JSON.stringify(WorkSessionTime));
    } else {
        BreakSessionTime -= 1;
        localStorage.setItem('breakSessionTime', JSON.stringify(BreakSessionTime));
    }
    updateSession();
});

miniIncMinuteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isSessionRunning) return;
    minutes += 1;
    if (isWorkSession) {
        WorkSessionTime += 1;
        localStorage.setItem('workSessionTime', JSON.stringify(WorkSessionTime));
    } else {
        BreakSessionTime += 1;
        localStorage.setItem('breakSessionTime', JSON.stringify(BreakSessionTime));
    }
    updateSession();
});

miniDecMinuteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isSessionRunning) return;
    minutes -= 1;
    if (isWorkSession) {
        WorkSessionTime -= 1;
        localStorage.setItem('workSessionTime', JSON.stringify(WorkSessionTime));
    } else {
        BreakSessionTime -= 1;
        localStorage.setItem('breakSessionTime', JSON.stringify(BreakSessionTime));
    }
    updateSession();
});

// - Play, Pause and Reset handling
const miniPlayButton = document.getElementById('mini-timer-start');
const miniPauseButton = document.getElementById('mini-timer-pause');
const miniResetButton = document.getElementById('mini-timer-reset');
const playButton = document.getElementById('timer-start');
const pauseButton = document.getElementById('timer-pause');
const resetButton = document.getElementById('timer-reset');

let pTimer = null;

const timer = () => {
    if (!minutes && !seconds && pTimer !== null) {
        clearInterval(pTimer);
        pTimer = null;
        isWorkSession = !isWorkSession;
        minutes = isWorkSession ? WorkSessionTime : BreakSessionTime;
        seconds = 0;
        isSessionRunning = false;
        updateSession();
        return;
    }
    if (!seconds) {
        minutes -= 1;
        seconds = 59;
    } else {
        seconds--;
    }
    updateSession();
};

playButton.addEventListener('click', () => {
    if (pTimer === null) {
        isSessionRunning = true;
        pTimer = setInterval(timer, 1000);
    }
});

pauseButton.addEventListener('click', () => {
    if (pTimer !== null) {
        isSessionRunning = false;
        clearInterval(pTimer);
        pTimer = null;
    }
});

resetButton.addEventListener('click', () => {
    if (pTimer !== null) {
        isSessionRunning = false;
        clearInterval(pTimer);
        pTimer = null;
    }
    minutes = WorkSessionTime;
    seconds = 0;
    updateSession();
});

miniPlayButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (pTimer === null) {
        isSessionRunning = true;
        pTimer = setInterval(timer, 1000);
    }
});

miniPauseButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (pTimer !== null) {
        isSessionRunning = false;
        clearInterval(pTimer);
        pTimer = null;
    }
});

miniResetButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (pTimer !== null) {
        isSessionRunning = false;
        clearInterval(pTimer);
        pTimer = null;
    }
    minutes = isWorkSession ? WorkSessionTime : BreakSessionTime;
    seconds = 0;
    updateSession();
});

updateSession();

// Daily Planner handling
const blockTimes = [
    { id: 0, time: '00:00', isTaken: false },
    { id: 1, time: '01:00', isTaken: false },
    { id: 2, time: '02:00', isTaken: false },
    { id: 3, time: '03:00', isTaken: false },
    { id: 4, time: '04:00', isTaken: false },
    { id: 5, time: '05:00', isTaken: false },
    { id: 6, time: '06:00', isTaken: false },
    { id: 7, time: '07:00', isTaken: false },
    { id: 8, time: '08:00', isTaken: false },
    { id: 9, time: '09:00', isTaken: false },
    { id: 10, time: '10:00', isTaken: false },
    { id: 11, time: '11:00', isTaken: false },
    { id: 12, time: '12:00', isTaken: false },
    { id: 13, time: '13:00', isTaken: false },
    { id: 14, time: '14:00', isTaken: false },
    { id: 15, time: '15:00', isTaken: false },
    { id: 16, time: '16:00', isTaken: false },
    { id: 17, time: '17:00', isTaken: false },
    { id: 18, time: '18:00', isTaken: false },
    { id: 19, time: '19:00', isTaken: false },
    { id: 20, time: '20:00', isTaken: false },
    { id: 21, time: '21:00', isTaken: false },
    { id: 22, time: '22:00', isTaken: false },
    { id: 23, time: '23:00', isTaken: false }
];

let plannerList = JSON.parse(window.localStorage.getItem('plannerList')) || [];
const BaseHeight = 60; // Base height scale per hour in pixels

const startTimeDropdown = document.getElementById('start-time');
const endTimeDropdown = document.getElementById('end-time');
const addEventForm = document.getElementById('add-event-form');
const eventTitleField = document.getElementById('event-title');
const plannerAgenda = document.getElementById('planner-agenda');
const dashPlannerAgenda = document.getElementById('dash-planner-agenda');
const plannerFeedback = document.getElementById('planner-feedback');
const addEventBtn = addEventForm ? addEventForm.querySelector('.add-event-btn') : null;
let plannerId = plannerList.length ? Math.max(...plannerList.map(e => e.id || 0)) + 1 : 1;
let skipStartChangeHandler = false;

function timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

function eventEndMinutes(endTime) {
    if (!endTime) return 0;
    if (endTime === '24:00') return 24 * 60;
    return timeToMinutes(endTime);
}

function rangesOverlap(startA, endA, startB, endB) {
    return startA < endB && startB < endA;
}

function formatTimeString(timeStr) {
    if (!timeStr) return '';
    if (timeStr === '24:00') return '12:00 AM';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hours12 = h % 12 === 0 ? 12 : h % 12;
    const minsFormatted = (m < 10 ? '0' : '') + m;
    return `${hours12}:${minsFormatted} ${period}`;
}

function getHalfHourSlots() {
    const options = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            const timeVal = `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
            options.push(timeVal);
        }
    }
    return options;
}

function syncBlockTimes() {
    blockTimes.forEach((slot) => {
        slot.isTaken = false;
    });
    plannerList.forEach((event) => {
        const startMins = timeToMinutes(event.startTime);
        const endMins = eventEndMinutes(event.endTime);
        blockTimes.forEach((slot) => {
            const hourStart = timeToMinutes(slot.time);
            const hourEnd = hourStart + 60;
            if (rangesOverlap(hourStart, hourEnd, startMins, endMins)) {
                slot.isTaken = true;
            }
        });
    });
}

function isStartTaken(timeStr) {
    const t = timeToMinutes(timeStr);
    return plannerList.some((event) => {
        const startMins = timeToMinutes(event.startTime);
        const endMins = eventEndMinutes(event.endTime);
        return t >= startMins && t < endMins;
    });
}

function wouldOverlap(start, end) {
    const startMins = timeToMinutes(start);
    const endMins = eventEndMinutes(end);
    if (endMins <= startMins) return true;
    return plannerList.some((event) =>
        rangesOverlap(startMins, endMins, timeToMinutes(event.startTime), eventEndMinutes(event.endTime))
    );
}

function setPlannerFeedback(message) {
    if (!plannerFeedback) return;
    plannerFeedback.textContent = message || '';
}

function selectEnabledValue(selectEl, preferred) {
    const enabled = [...selectEl.options].filter((opt) => !opt.disabled);
    if (!enabled.length) return;
    if (preferred && enabled.some((opt) => opt.value === preferred)) {
        selectEl.value = preferred;
        return;
    }
    selectEl.value = enabled[0].value;
}

function updateTimeDropdowns() {
    if (!startTimeDropdown || !endTimeDropdown) return;

    const currentStart = startTimeDropdown.value;
    const nowHour = new Date().getHours();
    const defaultTime = `${nowHour < 10 ? '0' + nowHour : nowHour}:00`;

    skipStartChangeHandler = true;
    startTimeDropdown.innerHTML = '';

    getHalfHourSlots().forEach((timeVal) => {
        const optionElem = document.createElement('option');
        optionElem.value = timeVal;
        const taken = isStartTaken(timeVal);
        optionElem.disabled = taken;
        optionElem.textContent = taken ? `${formatTimeString(timeVal)} (blocked)` : formatTimeString(timeVal);
        startTimeDropdown.appendChild(optionElem);
    });

    const enabledStarts = [...startTimeDropdown.options].filter((opt) => !opt.disabled);
    if (!enabledStarts.length) {
        setPlannerFeedback('No free time slots left today. Delete an event to free a block.');
        if (addEventBtn) addEventBtn.disabled = true;
        endTimeDropdown.innerHTML = '';
        skipStartChangeHandler = false;
        return;
    }

    const preferred = (!isStartTaken(currentStart) && currentStart) ? currentStart
        : (!isStartTaken(defaultTime) ? defaultTime : enabledStarts[0].value);
    selectEnabledValue(startTimeDropdown, preferred);
    if (addEventBtn) addEventBtn.disabled = false;
    setPlannerFeedback('');

    updateEndTimeDropdown();
    skipStartChangeHandler = false;
}

function updateEndTimeDropdown() {
    if (!startTimeDropdown || !endTimeDropdown) return;
    const selectedStart = startTimeDropdown.value || '09:00';
    const startMins = timeToMinutes(selectedStart);
    const previousEnd = endTimeDropdown.value;

    endTimeDropdown.innerHTML = '';

    const options = getHalfHourSlots();
    options.push('24:00');

    options.forEach((timeVal) => {
        const endMins = eventEndMinutes(timeVal);
        if (endMins <= startMins) return;

        const optionElem = document.createElement('option');
        optionElem.value = timeVal;
        const overlaps = wouldOverlap(selectedStart, timeVal);
        optionElem.disabled = overlaps;
        if (timeVal === '24:00') {
            optionElem.textContent = overlaps ? '12:00 AM (End of day) (blocked)' : '12:00 AM (End of day)';
        } else {
            optionElem.textContent = overlaps ? `${formatTimeString(timeVal)} (blocked)` : formatTimeString(timeVal);
        }
        endTimeDropdown.appendChild(optionElem);
    });

    const defaultEndMins = startMins + 60;
    const defaultEndH = Math.floor(defaultEndMins / 60);
    const defaultEndM = defaultEndMins % 60;
    const defaultEndStr = defaultEndH < 24
        ? `${defaultEndH < 10 ? '0' + defaultEndH : defaultEndH}:${defaultEndM < 10 ? '0' + defaultEndM : defaultEndM}`
        : '24:00';

    const enabledEnds = [...endTimeDropdown.options].filter((opt) => !opt.disabled);
    if (!enabledEnds.length) {
        if (addEventBtn) addEventBtn.disabled = true;
        setPlannerFeedback('No free end time after this start. Choose another start time.');
        return;
    }

    if (addEventBtn && [...startTimeDropdown.options].some((opt) => !opt.disabled)) {
        addEventBtn.disabled = false;
    }

    const preferredEnd = previousEnd && enabledEnds.some((opt) => opt.value === previousEnd)
        ? previousEnd
        : (enabledEnds.some((opt) => opt.value === defaultEndStr) ? defaultEndStr : enabledEnds[0].value);
    selectEnabledValue(endTimeDropdown, preferredEnd);
}

if (startTimeDropdown) {
    startTimeDropdown.addEventListener('change', () => {
        if (skipStartChangeHandler) return;
        setPlannerFeedback('');
        updateEndTimeDropdown();
    });
}

function removePlannerEvent(id) {
    if (window.confirm('Do you want to delete this event?') === false) return;
    plannerList = plannerList.filter((event) => event.id !== id);
    setPlannerFeedback('');
    renderPlannerList();
}

function renderPlannerList() {
    plannerList.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
    window.localStorage.setItem('plannerList', JSON.stringify(plannerList));
    syncBlockTimes();

    if (plannerAgenda) plannerAgenda.innerHTML = '';
    if (dashPlannerAgenda) dashPlannerAgenda.innerHTML = '';

    if (plannerList.length === 0) {
        const emptyHTML = `<li class="planner-empty-state"><i class="ri-calendar-event-line"></i> No scheduled events for today.</li>`;
        if (plannerAgenda) plannerAgenda.innerHTML = emptyHTML;
        if (dashPlannerAgenda) dashPlannerAgenda.innerHTML = emptyHTML;
        updateTimeDropdowns();
        return;
    }

    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    plannerList.forEach((event) => {
        const startMins = timeToMinutes(event.startTime);
        const endMins = eventEndMinutes(event.endTime);
        const durationMins = Math.max(endMins - startMins, 30);
        const heightPx = Math.max(Math.round((durationMins / 60) * BaseHeight), 50);
        const isCurrent = currentMins >= startMins && currentMins < endMins;
        const timeDisplay = `${formatTimeString(event.startTime)} – ${formatTimeString(event.endTime)}`;

        const liFull = document.createElement('li');
        liFull.className = `cal-event ${isCurrent ? 'is-current-event' : ''}`;
        liFull.id = `planner-event-${event.id}`;
        liFull.style.minHeight = `${heightPx}px`;

        liFull.innerHTML = `
            <div class="cal-event-main">
                <span class="event-title">
                    ${event.title}
                    ${isCurrent ? '<span class="now-badge">NOW</span>' : ''}
                </span>
                <button type="button" class="planner-delete-btn" title="Delete event" aria-label="Delete event" onclick="removePlannerEvent(${event.id})">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <span class="event-time"><i class="ri-time-line"></i> ${timeDisplay}</span>
        `;

        const liDash = document.createElement('li');
        liDash.className = `cal-event ${isCurrent ? 'is-current-event' : ''}`;
        liDash.id = `dash-event-${event.id}`;
        liDash.style.minHeight = `${Math.min(heightPx, 80)}px`;
        liDash.innerHTML = `
            <div class="cal-event-main">
                <span class="event-title">
                    ${event.title}
                    ${isCurrent ? '<span class="now-badge">NOW</span>' : ''}
                </span>
            </div>
            <span class="event-time"><i class="ri-time-line"></i> ${timeDisplay}</span>
        `;

        if (plannerAgenda) plannerAgenda.appendChild(liFull);
        if (dashPlannerAgenda) dashPlannerAgenda.appendChild(liDash);
    });

    updateTimeDropdowns();
    focusActivePlannerSlot();
}

function focusActivePlannerSlot() {
    if (!plannerList.length) return;

    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    let targetEvent = plannerList.find((event) => {
        const startMins = timeToMinutes(event.startTime);
        const endMins = eventEndMinutes(event.endTime);
        return currentMins >= startMins && currentMins < endMins;
    });

    if (!targetEvent) {
        targetEvent = plannerList.find((event) => timeToMinutes(event.startTime) > currentMins);
    }

    if (!targetEvent && plannerList.length > 0) {
        targetEvent = plannerList[0];
    }

    if (targetEvent) {
        const fullElem = document.getElementById(`planner-event-${targetEvent.id}`);
        const dashElem = document.getElementById(`dash-event-${targetEvent.id}`);

        if (fullElem && plannerAgenda) {
            plannerAgenda.scrollTop = fullElem.offsetTop - plannerAgenda.offsetTop - 10;
        }
        if (dashElem && dashPlannerAgenda) {
            dashPlannerAgenda.scrollTop = dashElem.offsetTop - dashPlannerAgenda.offsetTop - 10;
        }
    }
}

if (addEventForm) {
    addEventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = eventTitleField.value.trim();
        const startTime = startTimeDropdown.value;
        const endTime = endTimeDropdown.value;

        if (!title) return;

        if (!startTime || !endTime || isStartTaken(startTime) || wouldOverlap(startTime, endTime)) {
            updateTimeDropdowns();
            setPlannerFeedback('That time range overlaps an existing event. Pick a free block.');
            return;
        }

        plannerList.push({
            id: plannerId,
            title: title,
            startTime: startTime,
            endTime: endTime
        });

        plannerId++;
        setPlannerFeedback('');
        eventTitleField.value = '';
        renderPlannerList();
    });
}

document.querySelectorAll('button[data-target="view-planner"], div[data-target="view-planner"]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
        setTimeout(focusActivePlannerSlot, 100);
    });
});

renderPlannerList();

