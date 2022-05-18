export const StatusMap = {
    'opened': 'Открыто',
    'inProgress': 'В работе',
    'complete': 'Сделано',
    'testing': 'Тестирование',
};

export const RankMap = {
    'low': 'Низкий',
    'medium': 'Средний',
    'high': 'Высокий',
};

export const TaskMap = {
    'task': 'Задача',
    'bug': 'Ошибка'
}

export const closeDropdown = (evt) => {
    evt.target.classList.remove('capet-up');
}

export const toggleDropdown = (evt) => {
    evt.target.classList.toggle('capet-up');
}