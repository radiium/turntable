interface ISample {
  code: string;
  title: string;
}
export class Sample {

  public static SAMPLES_ARRAY: Array<ISample> = [
    { code: 'hello', title: 'Print Hello' },
    { code: 'any', title: 'Print any' }
  ];

}
