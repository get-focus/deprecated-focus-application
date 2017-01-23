

export const intializeTranslation = (i18nextProject, language = 'fr-FR', resources = []) => {
    i18nextProject.init({
        lng: language,
        resources: {
            [language]: {
                translation: resources.reduce((acc, newValue) => ({...acc, ...newValue, focus: {...acc.focus, ...newValue.focus}}))
            }
        }
    }, (err, t) => {
        console.info('[FOCUS-APPLICATION] Translation initialized !');
    });
};
