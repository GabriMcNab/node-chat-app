var socket = io();

function scrollToBottom() {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child')

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = $.deparam(window.location.search);
  $('#room-name').text(params.room);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No errors');
    }
  });
});

socket.on('updateUserList', function (users) {
  $('#users-list').empty();
  users.forEach(function (user) {
    var template = $('#user-template').html();
    var html = Mustache.render(template, { user });
    $('#users-list').append(html);
  });
})

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  var fromattedTime = moment(message.createdAt).format('h:mm a');
  var position;
  if (socket.id === message.socketId) {
    position = 'right';
  } else {
    position = 'left';
  }
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    position,
    text: message.text,
    from: message.from,
    createdAt: fromattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

$('#sidebar-toggle').on('click', function() {
  $('.sidebar').toggleClass('show');
  $('.hamburger').toggleClass('is-active');
});