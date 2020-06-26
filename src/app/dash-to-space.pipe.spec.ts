import { DashToSpacePipe } from './dash-to-space.pipe';

describe('DashToSpacePipe', () => {
  let pipe: DashToSpacePipe;

  beforeEach(() => {
    pipe = new DashToSpacePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform dashes to spaces', () => {
    const initial = 'the-quick-brown-fox-jumps-over-the-lazy-dog';
    expect(pipe.transform(initial)).toBe(
      'the quick brown fox jumps over the lazy dog',
      'spaces were transformed incorrectly'
    );
  });
});
