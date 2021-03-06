const user = {
    nickname: 'nightwatch' + new Date().getTime(),
    password: 'nightwatch'
};

const chat = {
    title: 'nightwatch'
};

const message = {
    content: 'nightwatch'
};

module.exports = {
    'User can register': function (browser) {
        browser
            // eslint-disable-next-line
            .url('http://localhost:3000/')
            .waitForElementVisible('body')
            .assert.visible('body')
            .click('a[href="/registration"')
            .waitForElementVisible('div.registration-view')
            .assert.visible('div.registration-view')
            // eslint-disable-next-line
            .setValue('input[name="nickname"]', user.nickname)
            // eslint-disable-next-line
            .setValue('input[name="password"]', user.password)
            .submitForm('form')
            // eslint-disable-next-line
            .waitForElementVisible('div.result')
            .assert.containsText('div.result', 'Пользователь успешно зарегистрирован')
            .end();
    },
    'User can log in': function (browser) {
        browser
            .url('http://localhost:3000/')
            // eslint-disable-next-line
            .click('a[href="/login"')
            .waitForElementVisible('div.login-view')
            .assert.visible('div.login-view')
            .setValue('input[name="nickname"]', user.nickname)
            .setValue('input[name="password"]', user.password)
            .submitForm('form')
            .waitForElementVisible('div.result')
            .assert.containsText('div.result', 'Пользователь успешно залогинился')
            .end();
    },
    'User can log in and create chat': function (browser) {
        browser
            .url('http://localhost:3000/')
            .click('a[href="/login"')
            .setValue('input[name="nickname"]', user.nickname)
            .setValue('input[name="password"]', user.password)
            .submitForm('form')
            .click('a[href="/profile"')
            .setValue('input[name="chat-title"]', chat.title)
            .submitForm('form.chat-form')
            .assert.containsText('ul.chat-list', chat.title)
            .end();
    },
    'User can enter to chat and post message': function (browser) {
        browser
            .url('http://localhost:3000/')
            .click('a[href="/login"')
            .setValue('input[name="nickname"]', user.nickname)
            .setValue('input[name="password"]', user.password)
            .submitForm('form')
            .click('a[href="/profile"')
            .useXpath()
            .click(`//*[contains(text(), '${chat.title}')]`)
            .useCss()
            .waitForElementVisible('div.chat-view')
            .setValue('input[name="content"]', message.content)
            .submitForm('form.message-form')
            .assert.containsText('ul.message-list', message.content)
            .end();
    }
};
