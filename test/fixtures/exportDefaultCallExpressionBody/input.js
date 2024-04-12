export default connect(null, {
    setDictionariesData,
})((props) => (
    <TranslationLangContext.Consumer>
        {(lang) => <ShortResumeDataLoader {...props} lang={lang} />}
    </TranslationLangContext.Consumer>
));
