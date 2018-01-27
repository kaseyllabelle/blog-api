const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('BlogPosts', function(){
  before(function(){
    return runServer();
  });
  after(function(){
    return closeServer();
  });
  it('should list blog posts on GET', function(){
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.at.least(1);
        const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });
  it('should add a blog post on POST', function(){
    const newPost = {
      title: 'Obama Ipsum', 
      content: `I know there are differences on same-sex marriage, but surely we can agree that our gay and lesbian brothers and sisters deserve to visit the person they love in the hospital and to live lives free of discrimination.`, 
      author: 'Former President Barack Obama'
    };
    const expectedKeys = ['id', 'publishDate'].concat(Object.keys(newPost));
    return chai.request(app)
      .post('/blog-posts')
      .send(newPost)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys(expectedKeys);
        expect(res.body.id).to.not.equal(null);
        expect(res.body.title).to.equal(newPost.title);
        expect(res.body.content).to.equal(newPost.content);
        expect(res.body.author).to.equal(newPost.author)
      });
  });
  it('should delete a blog post on DELETE', function(){
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res){
        return chai.request(app)
          .delete(`/blog-posts/${res.body[0].id}`);
      })
      .then(function(res){
        expect(res).to.have.status(204);
      });
  });
  it('should update a blog post on PUT', function(){
    const updatePost = {
      title: 'foo',
      content: 'bar',
      author: 'baz',
      publishDate: 'bang'
    };
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res){
        updatePost.id = res.body[0].id;
        return chai.request(app)
          .put(`/blog-posts/${updatePost.id}`)
          .send(updatePost);
      })
      .then(function(res){
        expect(res).to.have.status(204);
      });
  });
});