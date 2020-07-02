import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostsService } from './posts.service';

describe('PostsService', () => {
  const mockPosts = [
    {
      title: 'test-title-1',
      content: 'test-content-1',
    },
    {
      title: 'test-title-2',
      content: 'test-content-2',
    },
  ];
  const mockPost = {
    title: 'mock-post-title',
    content: 'mock-post-content',
  };
  const mockPartialPost = {
    content: 'mock-partial-post-content',
  };
  const mockId = '5efac42a8a22fe9c441f689e';

  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PostsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET a list of posts from api', (done) => {
    service.getPosts().subscribe((projects) => {
      expect(projects).toEqual(mockPosts);
      done();
    });

    const req = httpMock.expectOne(PostsService.postsUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(mockPosts);
  });

  it('should POST to try to create a new post', (done) => {
    const returnurl = 'http://url/test';
    service.createPost(mockPost).subscribe((url) => {
      expect(url).toEqual(returnurl);
      done();
    });

    const req = httpMock.expectOne(PostsService.postsUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockPost);

    req.flush(returnurl);
  });

  it('should PATCH to partially update a post', async (done) => {
    const positive = service.patchPost(mockId, mockPartialPost).toPromise().then((success) => {
      expect(success).toEqual(true);
    });

    let req = httpMock.expectOne(`${PostsService.postsUrl}/${mockId}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(mockPartialPost);

    req.flush('OK');

    await positive;

    service.patchPost(mockId, mockPartialPost).subscribe((success) => {
      expect(success).toEqual(false);
      done();
    });

    req = httpMock.expectOne(`${PostsService.postsUrl}/${mockId}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(mockPartialPost);

    req.error(new ErrorEvent('404'));
  });

  it('should PUT to replace a post', async (done) => {
    const positive = service.putPost(mockId, mockPost).toPromise().then((success) => {
      expect(success).toEqual(true);
    });

    let req = httpMock.expectOne(`${PostsService.postsUrl}/${mockId}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockPost);

    req.flush('OK');

    await positive;

    service.putPost(mockId, mockPost).subscribe((success) => {
      expect(success).toEqual(false);
      done();
    });

    req = httpMock.expectOne(`${PostsService.postsUrl}/${mockId}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockPost);

    req.error(new ErrorEvent('404'));
  });

  it('should DELETE to remove a post', (done) => {
    service.deletePost(mockId).subscribe((success) => {
      expect(success).toEqual(true);
      done();
    });

    const req = httpMock.expectOne(`${PostsService.postsUrl}/${mockId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush('OK');
  });
});
