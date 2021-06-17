import moment from 'moment';

// Get visible expenses

(options, {sortBy}) => {
 return options.sort((a, b) => {
   if (sortBy === 'Asc') {
     return a.vote < b.vote ? 1 : -1;
   } else if (sortBy === 'Desc') {
     return a.vote < b.vote ? 1 : -1;
   }
 });
}