!function () {
  const socket = io();
  const chat = document.querySelector('#content')
  const BOT_REPLY_DELAY = 500

  socket.on('bot-response', data => {
    const { response, options } = data
    createChatContainer(response.content, true)
    createOptions(options)
  })


  const isScrollable = e => {
    const hasScrollableContent = e.scrollHeight > e.clientHeight
    const overflowYStyle = window.getComputedStyle(e).overflowY
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1
    return hasScrollableContent && !isOverflowHidden
}

  const scrollToBottom = () => {
    if (!isScrollable(chat)) {
      return
    }
    chat.scrollTop = chat.scrollHeight
  }

  const createChatContainer = (content, isBot = false) => {
    if (!content) {
      return
    }
    const container = document.createElement('div')
    const contentContainer = document.createElement('div')
    container.className = 'flex m-4'
    contentContainer.className = 'max-w-[calc(650px-150px)] bg-slate-500 text-white p-4 rounded-xl shadow-md rounded-bl-sm'
    container.append(contentContainer)
    chat.append(container)
    if (!isBot) {
      contentContainer.classList.remove('text-white', 'bg-slate-500', 'rounded-bl-sm')
      contentContainer.classList.add('bg-slate-200', 'rounded-br-sm')
      container.classList.add('flex-row-reverse')
      contentContainer.innerHTML = content
      scrollToBottom()
    }
    if (isBot) {
      contentContainer.innerHTML = '<img src="/assets/img/chat-typing.gif" width="30">'
      scrollToBottom()
      setTimeout(() => {
        contentContainer.innerHTML = content
        scrollToBottom()
      }, BOT_REPLY_DELAY)
    }
  }

  const createOptions = options => {
    const container = document.querySelector('#options')
    const collection = []
    for (const option of options) {
      const button = document.createElement('button')
      button.className = 'text-slate-500 rounded-full bg-white px-4 py-2 font-bold shadow-md h-[calc(3rem)] hover:bg-slate-500 hover:text-white transition-all duration-150'
      button.innerHTML = option.content
      button.addEventListener('click', () => {
        socket.emit('option-selected', option.response)
        createChatContainer(option.content)
        scrollToBottom()
        container.innerHTML = ''
      })
      collection.push(button)
    }
    container.innerHTML = ''
    setTimeout(() => {
      container.append(...collection)
    }, BOT_REPLY_DELAY)
  }
}()