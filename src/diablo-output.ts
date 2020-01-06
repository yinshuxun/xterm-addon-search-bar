import { OutputLayout, OutputBaseOption } from './core/output';

export default class DiabloOutput {
  _output: OutputLayout;

  constructor(private readonly option: OutputBaseOption) {
    this._output = new OutputLayout(option);
  }

  public write(data: string, callback?: () => void): void {
    this._output.write(data, callback);
  }

  public create(){
    this._output.create()
  }
}

(window as any).DiabloOutput = DiabloOutput;
