import AnsiUp from 'ansi_up';
import { Disposable } from './disposable';

export interface OutputBaseOption {
  el: string;
}

export class OutputLayout extends Disposable {
  private _document: Element | null;
  private au = new AnsiUp();
  private _option: OutputBaseOption;

  constructor(option: OutputBaseOption) {
    super();
    this._option = option;
    this._document = document.querySelector(this._option?.el || '');
  }

  private destroy() {}

  public write(data: string, callback?: () => void) {
    var a = this.au.ansi_to_html(data);
    console.log(a);
    this._document
      ?.querySelector('.diablo-output')
      ?.insertAdjacentHTML('beforeend', this.au.ansi_to_html(data));
  }

  public create() {
    const element = document.createElement('div');
    this._document?.appendChild(element);
    element.classList.add('diablo-output');
    element.style.background = '#333';
    element.style.color = '#fff';
  }
}
