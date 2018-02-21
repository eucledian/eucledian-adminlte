export default function() {
  this.timing = 2000;
  this.get('/cars');
  this.get('/cars/:id');
  this.get('/users');
  this.get('/users/:id');
  this.get('/parts');
  this.get('/parts/:id');
  this.get('/organizations');
  this.get('/organizations/:id');
}
