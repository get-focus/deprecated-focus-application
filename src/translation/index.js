

export const intializeTranslation = (i18nextProject, language = 'fr-FR', resources = [], stringSeparator = ':') => {
    i18nextProject.init({
        lng: language,
        resources: {
            [language]: {
                translation: resources.reduce((acc, newValue) => ({...acc, ...newValue, focus: {...acc.focus, ...newValue.focus}}))
            }
        },
        nsSeparator: stringSeparator
    }, (err, t) => {
        console.info('[FOCUS-APPLICATION] Translation initialized !');
    });
};
