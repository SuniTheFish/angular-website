import { CamelAddSpacesPipe } from './camel-add-spaces.pipe';

describe('CamelAddSpacesPipe', () => {
  let pipe: CamelAddSpacesPipe;

  beforeEach(() => {
    pipe = new CamelAddSpacesPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('adds spaces to camelcase', () => {
    const initial = 'TheQuickBrownFoxJumpsOverTheLazyDog';
    expect(pipe.transform(initial)).toEqual(
      'The Quick Brown Fox Jumps Over The Lazy Dog',
      'does not successfully add spaces'
    );
  });
});
