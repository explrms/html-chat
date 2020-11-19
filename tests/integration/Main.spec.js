const user = {
    nickname: 'nightwatch' + new Date().getTime(),
    password: 'nightwatch'
};

module.exports = {
    'Can register user': function (browser) {
        browser
            .url('http://localhost:3000/')
            .waitForElementVisible('body')
            .assert.visible('body')
            .click('a[href="/registration"]')
            .waitForElementVisible('div.registration')
            .assert.visible('input[name="nickname"]')
            .setValue('input[name="nickname"]', user.nickname)
            .assert.visible('input[name="password"]')
            .setValue('input[name="password"]', user.password)
            .assert.visible('button[type=submit]')
            .submitForm('form')
            .waitForElementVisible('div.result')
            .assert.containsText('div.result', 'Пользователь успешно зарегистрирован')
            .end();
    }
};
