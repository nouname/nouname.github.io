def send(vk, event, keyboard, to, text):
    vk.method('messages.send', {
        'user_id': to,
        'random_id': event.obj.random_id,
        'message': text,
        'keyboard': keyboard
    })
