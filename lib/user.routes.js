var Controllers = require('./controllers');

exports.register = function (plugin, options, next) {

    plugin.route([

        /* User authentication */
        // {
        //     path: '/auth/login',
        //     method: 'OPTIONS',
        //     config: Controllers.handlers.users.authentication.opts
        // },
        // {
        //     path: '/auth/signup',
        //     method: 'OPTIONS',
        //     config: Controllers.handlers.users.authentication.opts
        // },
        {
            path: '/auth/signup',
            method: 'POST',
            config: Controllers.handlers.users.authentication.signup
        },
        {
            path: '/auth/login',
            method: 'POST',
            config: Controllers.handlers.users.authentication.login
        },

        /* User password */
        {
            path: '/auth/forgot',
            method: 'POST',
            config: Controllers.handlers.users.password.forgot
        },
        {
            path: '/reset/{token}',
            method: 'GET',
            config: Controllers.handlers.users.password.validateResetToken
        },
        {
            path: '/reset/{token}',
            method: 'POST',
            config: Controllers.handlers.users.password.reset
        },
        {
            path: '/auth/password',
            method: 'POST',
            config: Controllers.handlers.users.password.changePassword
        },

        /* User profile */
        {
            path: '/auth/me',
            method: 'PUT',
            config: Controllers.handlers.users.profile.updateMe
        },
        {
            path: '/auth/me',
            method: 'GET',
            config: Controllers.handlers.users.profile.getMe
        },
        {
            path: '/auth/me/delete',
            method: 'DELETE',
            config: Controllers.handlers.users.profile.delete
        },
        //STRIPE
        {
            path: '/users/billing',
            method: 'POST',
            config: Controllers.handlers.users.stripe.postBilling
        },
        {
            path: '/users/plan',
            method: 'POST',
            config: Controllers.handlers.users.stripe.postPlan
        },
        //STRIPE
        {
            path: '/stripe/webhooks',
            method: 'POST',
            config: Controllers.handlers.users.stripe.webhooks
        },

    ]);

    next();
};



exports.register.attributes = {
    name: 'user-api-routes',
    version: require('../package.json').version
};
