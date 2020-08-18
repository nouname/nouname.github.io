from pandas.core.dtypes.inference import is_number
from vk_api import vk_api
from vk_api.bot_longpoll import VkBotLongPoll, VkBotEventType

import kb
import members
import messages
import requests


def checkSchedule(group):
    schedule = 'https://petrsu.ru/schedule/term?group=' + group
    r = requests.get(schedule)
    if r.status_code == 200:
        return schedule
    else:
        return 'Похоже, Вы ищете расписание, но такой группы нет, или произошла ошибка.'

    
print('init')

vk = vk_api.VkApi(token='074f2ef61918a058d8654e2a43a4837b3b78e14f2658184dc5a9f18128796840286e7d83a63a479851dfc')
longpoll = VkBotLongPoll(vk, '198007926')

current = '22307'
admin_id = 52077057
keyboard = kb.get()
hello = 'Привет!\nБот создан для рассылки важной актуальной информации.\n' \
        'Для получения ссылки на расписание введите номер группы или используйте кнопку для '\
        + current + '.\n\nАдминистратор гарантирует отсутствие мемов и срачей^^ '

for event in longpoll.listen():
    if event.type == VkBotEventType.MESSAGE_NEW:
        if event.obj.text.lower() == 'расписание':
            messages.send(vk, event, keyboard, event.obj.from_id, checkSchedule(current))
        elif event.obj.text.lower() == 'привет':
            messages.send(vk, event, keyboard, event.obj.from_id, hello)
        else:
            if event.obj.from_id == admin_id:
                for member in members.get(vk)['items']:
                    messages.send(vk, event, keyboard, member, event.obj.text)
            else:
                messages.send(vk, event, keyboard, event.obj.from_id, checkSchedule(event.obj.text))



