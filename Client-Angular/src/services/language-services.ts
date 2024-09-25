import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

export type Lang = 'ar' | 'en'

@Injectable({providedIn: 'root'})
export class LanguageServices {
  private LANGUAGE_KEY = 'lang'
  currentLang: Lang = 'ar'

  constructor(private translate: TranslateService) {
    this.initialize()
  }

  initialize() {
    const browserLang = this.translate.getBrowserLang();
    this.translate.setDefaultLang(browserLang?.match(/en|ar/) ? browserLang : 'ar');

    let lang = localStorage.getItem(this.LANGUAGE_KEY) as Lang | null
    if (lang === null) {
      lang = 'ar'
      localStorage.setItem(this.currentLang, 'ar')
    }
    this.setLanguage(lang)
  }

  setLanguage(lang: Lang) {
    localStorage.setItem(this.LANGUAGE_KEY, lang)
    this.translate.use(lang);
    this.currentLang = lang
    this.setDocumentDirection()
  }

  gt(key: string) {
    return this.translate.instant(key)
  }

  private setDocumentDirection() {
    if (this.currentLang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl'); // Set RTL direction
      document.documentElement.setAttribute('lang', 'ar'); // Set lang attribute for Arabic
    } else if (this.currentLang === 'en') {
      document.documentElement.setAttribute('dir', 'ltr'); // Set LTR direction for English
      document.documentElement.setAttribute('lang', 'en'); // Set lang attribute for English
    }
  }
}
