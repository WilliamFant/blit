document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('event-form');
    const eventNameInput = document.getElementById('event-name');
    const startTimeInput = document.getElementById('start-time');
    const durationHoursInput = document.getElementById('duration-hours');
    const durationMinutesInput = document.getElementById('duration-minutes');
    const repeatSelect = document.getElementById('repeat');
    const calendarEl = document.getElementById('calendar');
  
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
    });
  
    calendar.render();
  
    eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const eventName = eventNameInput.value;
      const startTime = new Date(startTimeInput.value);
      const durationHours = parseInt(durationHoursInput.value, 10);
      const durationMinutes = parseInt(durationMinutesInput.value, 10);
      const duration = durationHours * 60 + durationMinutes;
      const repeatOption = repeatSelect.value;
  
      addEvent(eventName, startTime, duration, repeatOption);
      eventForm.reset();
    });
  
    function addEvent(name, startTime, duration, repeatOption) {
      const endTime = new Date(startTime.getTime() + duration * 60 * 1000);
  
      switch (repeatOption) {
        case 'daily':
          for (let i = 0; i < 365; i++) {
            calendar.addEvent(createEventObject(name, startTime, endTime));
            startTime.setDate(startTime.getDate() + 1);
            endTime.setDate(endTime.getDate() + 1);
          }
          break;
        case 'weekly':
          for (let i = 0; i < 52; i++) {
            calendar.addEvent(createEventObject(name, startTime, endTime));
            startTime.setDate(startTime.getDate() + 7);
            endTime.setDate(endTime.getDate() + 7);
          }
          break;
        case 'monthly':
          for (let i = 0; i < 12; i++) {
            calendar.addEvent(createEventObject(name, startTime, endTime));
            startTime.setMonth(startTime.getMonth() + 1);
            endTime.setMonth(endTime.getMonth() + 1);
          }
          break;
        default:
          calendar.addEvent(createEventObject(name, startTime, endTime));
      }
    }
  
    function createEventObject(name, startTime, endTime) {
      return {
        title: name,
        start: new Date(startTime),
        end: new Date(endTime),
        allDay: false,
      };
    }
  });
  