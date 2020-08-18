import json


def get():
    buttons = [[{'action': {'type': 'text', 'payload': "{\"button\": \"1\"}", 'label': 'Привет'},
                 'color': 'default'},
                {'action': {'type': 'text', 'payload': "{\"button\": \"2\"}", 'label': 'Расписание'},
                 'color': 'primary'}
                ]]
    keyboard = {
        'one_time': True,
        'buttons': buttons
    }

    keyboard = json.dumps(keyboard, ensure_ascii=False).encode('utf-8')
    keyboard = str(keyboard.decode('utf-8'))
    return keyboard
