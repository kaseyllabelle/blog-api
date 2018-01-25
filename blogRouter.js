const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {BlogPosts} = require('./models');

BlogPosts.create('Lorem Ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum consectetur erat, sed imperdiet massa sollicitudin ut. Pellentesque scelerisque, metus in cursus feugiat, nisi turpis ultricies nibh, mattis varius odio massa vitae ligula. Maecenas nec convallis elit. Maecenas vehicula mollis pulvinar. In a nunc elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi mollis tincidunt elit, ut sollicitudin nisl volutpat vel. Cras pellentesque id dolor sit amet scelerisque. Pellentesque pretium lacinia elit non sollicitudin.', 'Vestibulum Bibendum');
BlogPosts.create('Hipster Ipsum', 'Man bun flexitarian stumptown meh la croix poke chambray. Man braid farm-to-table wolf, asymmetrical lumbersexual snackwave hammock skateboard shoreditch sustainable scenester deep v etsy biodiesel. Polaroid 8-bit hoodie selvage ramps, meggings kickstarter prism occupy vegan. Try-hard kitsch polaroid, mlkshk 8-bit hexagon wayfarers synth pabst kickstarter. Wayfarers four dollar toast whatever, keytar swag tilde pop-up viral mumblecore quinoa ethical vegan. Flexitarian brooklyn yuccie, vinyl aesthetic taxidermy sartorial lumbersexual. Pug poutine keffiyeh succulents vaporware farm-to-table kombucha vexillologist.', 'Brooklyn Yuccie');
BlogPosts.create('Bacon Ipsum', 'Bacon ipsum dolor amet picanha jerky kielbasa ham, biltong rump short loin pork. Shoulder tri-tip brisket cow pork chop buffalo bacon andouille biltong sausage ham hock swine meatloaf fatback venison. Kevin burgdoggen alcatra jerky, ham hock rump doner cow. Ribeye chicken corned beef chuck jerky landjaeger t-bone. Pig capicola sirloin doner chicken filet mignon turducken pork chop alcatra. Swine burgdoggen hamburger ground round chicken andouille ham hock bresaola ribeye capicola. Beef ribs tail bacon shank boudin venison beef flank.', 'Meatloaf Fatback');
BlogPosts.create('Mitch Ipsum', `"I can whistle with my fingers too... especially if I have a whistle."I bought a seven-dollar pen because I always lose pens and I got sick of not caring."I like cottage cheese. That is why I want to try other dwelling cheeses, too. How about studio apartment cheese? Tent cheese? Mobile home cheese? Do not eat mobile home cheese in a tornado. It would be devastating.`, 'Mitch Hedberg');
BlogPosts.create('Corporate Ipsum', 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.', 'Bill Business');
BlogPosts.create('Puppy Ipsum', 'Squirrel bring it pomsky, beagle lab vet pit bull shih tzu yorkshire terrier release. Yorkshire terrier squeak toy spin lap dog poodle leave it bark bell fetch. Dog bone dog pug husky pit bull, come take it leap leave it vet down poodle st bernard leave it. Spin greyhound leave it paw bell jump squeak toy. Down take it catch, dog bone spin pit bull maltese poodle doberman pinscher greyhound leap leave it shake vet. Collar puppies catch roll over collar leap chihuahua stand. Peanut butter tail leash kong sit pretty rottweiler release.', 'Rhino');

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(post);
});

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  res.status(204).end();
})

module.exports = router;