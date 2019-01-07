// @flow
// Drop tables and create test data when not in production environment
import { Article, Category, Comment, Rating, sequelize, User } from './mysql';

let production = process.env.NODE_ENV === 'production';

// The sync promise can be used to wait for the database to be ready (for instance in your tests)
export const sync = sequelize.sync({ force: !production }).then(() => {
  if (!production)
    return Category.bulkCreate([
      {
        name: 'Sport'
      },
      {
        name: 'Kultur'
      },
      {
        name: 'Nyhet'
      },
      {
        name: 'Vitenskap'
      },
      {
        name: 'Data'
      }
    ])
      .then(() =>
        User.create({
          username: 'Per persen',
          email: 'per.persen@ntnu.no',
          password: '12345678'
        })
      )
      .then(() =>
        User.create({
          username: 'Ola Olsen',
          email: 'ola.olsen@ntnu.no',
          password: '12345678'
        })
      )
      .then(() =>
        User.create({
          username: 'Snorre Strand',
          email: 'snorrestrand@hotmail.com',
          password: '1234567'
        })
      )
      .then(() =>
        Article.bulkCreate([
          {
            title: 'Tittel 1',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non ornare enim, at dapibus mauris. Vestibulum mattis nunc ac quam iaculis commodo. Nullam imperdiet pulvinar tellus, in laoreet nulla pharetra sit amet. Nulla elementum velit sit amet eleifend dictum. Aenean varius tellus eu ornare congue. Duis leo mi, lobortis eleifend nisl vel, accumsan pulvinar justo. Fusce vehicula eros sed euismod viverra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ornare sapien eu dapibus posuere. Praesent ac efficitur purus.\n' +
              '\n' +
              'Mauris aliquet egestas erat, malesuada ornare eros iaculis at. Quisque pharetra ligula nisl, at pharetra enim aliquet porttitor. Suspendisse metus massa, condimentum ut erat vel, sagittis condimentum ligula. Praesent rutrum orci eu turpis semper, quis vestibulum augue scelerisque. Duis varius velit non mauris semper, at tempor nisl feugiat. Morbi molestie tempus sapien, vel fermentum metus ullamcorper a. Mauris at hendrerit odio. Aliquam quis porttitor orci, sit amet mollis ipsum. In hac habitasse platea dictumst. Nulla ullamcorper laoreet sem. In quis augue urna. Nullam rhoncus ipsum non dui ullamcorper, vitae ullamcorper urna efficitur. Nulla quis libero accumsan, bibendum magna at, luctus odio. Etiam finibus urna a sapien consequat, at lacinia arcu vulputate. Vivamus id massa arcu. Cras pulvinar ipsum velit, eget commodo ex vehicula vel.\n' +
              '\n' +
              'Cras pharetra urna at laoreet congue. In scelerisque massa vel massa tristique interdum. Fusce condimentum tellus ac arcu suscipit, sit amet porttitor lacus molestie. Phasellus lobortis libero sit amet bibendum bibendum. Sed pulvinar pulvinar urna. Morbi pharetra posuere velit sed iaculis. Phasellus suscipit elit id erat interdum tincidunt. Phasellus tempor id diam at fermentum. Nam ornare blandit ante, ut gravida turpis vestibulum mollis.\n' +
              '\n' +
              'Phasellus ac elit molestie, ullamcorper mauris non, ullamcorper ipsum. Integer gravida libero nec tortor dapibus tempus. Cras congue auctor efficitur. Morbi at lobortis ligula. Duis ut hendrerit lectus. Fusce vel eros sit amet urna facilisis egestas sed et ligula. Donec malesuada nisl vitae lectus malesuada, sed dignissim mauris accumsan.',
            categoryName: 'Sport',
            picture: 'article2.jpg',
            important: true,
            userId: 1
          },
          {
            title: 'Tittel 2',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content: 'Lorem ipsum dolor sit amet',
            categoryName: 'Kultur',
            picture: 'article2.jpg',
            important: true,
            userId: 1
          },
          {
            title: 'Tittel 3',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content: 'Lorem ipsum dolor sit amet',
            categoryName: 'Nyhet',
            picture: 'article2.jpg',
            important: true,
            userId: 1
          },
          {
            title: 'Tittel 4',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content: 'Lorem ipsum dolor sit amet',
            categoryName: 'Vitenskap',
            picture: 'article2.jpg',
            important: true,
            userId: 1
          }
        ])
      )
      .then(() =>
        Article.bulkCreate([
          {
            title: 'Tittel 5',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content: 'Lorem ipsum dolor sit amet',
            categoryName: 'Data',
            picture: 'article2.jpg',
            important: true,
            userId: 1
          },
          {
            title: 'Tittel 6',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content: 'Lorem ipsum dolor sit amet',
            categoryName: 'Kultur',
            picture: 'article2.jpg',
            important: true,
            userId: 1
          },
          {
            title: 'Tittel 7',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content: 'Lorem ipsum dolor sit amet',
            categoryName: 'Data',
            picture: 'article2.jpg',
            important: true,
            userId: 1
          },
          {
            title: 'Tittel 8',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content: 'Lorem ipsum dolor sit amet',
            categoryName: 'Data',
            picture: 'article2.jpg',
            important: false,
            userId: 1
          }
        ])
      )
      .then(() =>
        Article.bulkCreate([
          {
            title: 'Tittel 9',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content: 'Lorem ipsum dolor sit amet',
            categoryName: 'Kultur',
            picture: 'article2.jpg',
            important: true,
            userId: 1
          },
          {
            title: 'Tittel 10',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content: 'Lorem ipsum dolor sit amet',
            categoryName: 'Sport',
            picture: 'article2.jpg',
            important: true,
            userId: 1
          },
          {
            title: 'Tittel 11',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content: 'Lorem ipsum dolor sit amet',
            categoryName: 'Kultur',
            picture: 'article2.jpg',
            important: false,
            userId: 1
          },
          {
            title: 'Tittel 12',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi erat ligula, consequat id ullamcorper quis, imperdiet sed eros. Sed gravida.',
            content: 'Lorem ipsum dolor sit amet',
            categoryName: 'Kultur',
            picture: 'article2.jpg',
            important: true,
            userId: 1
          }
        ])
      )
      .then(() =>
        Comment.bulkCreate([
          {
            content: 'Veldig nice bra artikkel :^)',
            userId: 2,
            articleId: 1
          },
          {
            content: 'Ja det må sies! Veldig nice bra saker her',
            userId: 3,
            articleId: 1
          },
          {
            content: 'Takk for fine tilbakemeldinger ;:^)',
            userId: 1,
            articleId: 1
          },
          {
            content: 'Bare hyggelig fortsett slikt :^)',
            userId: 2,
            articleId: 1
          }
        ])
      )
      .then(() =>
        Rating.bulkCreate([
          {
            value: '4',
            userId: 3,
            articleId: 5
          },
          {
            value: '5',
            userId: 2,
            articleId: 7
          },
          {
            value: '5',
            userId: 2,
            articleId: 4
          },
          {
            value: '4',
            userId: 2,
            articleId: 3
          },
          {
            value: '4',
            userId: 2,
            articleId: 1
          },
          {
            value: '3',
            userId: 2,
            articleId: 5
          },
          {
            value: '5',
            userId: 1,
            articleId: 7
          },
          {
            value: '4',
            userId: 1,
            articleId: 4
          },
          {
            value: '4',
            userId: 1,
            articleId: 3
          },
          {
            value: '3',
            userId: 1,
            articleId: 1
          },
          {
            value: '3',
            userId: 1,
            articleId: 5
          },
          {
            value: '3',
            userId: 1,
            articleId: 6
          },
          {
            value: '3',
            userId: 1,
            articleId: 2
          },
          {
            value: '3',
            userId: 1,
            articleId: 8
          },
          {
            value: '3',
            userId: 1,
            articleId: 9
          },
          {
            value: '3',
            userId: 1,
            articleId: 10
          },
          {
            value: '3',
            userId: 1,
            articleId: 11
          },
          {
            value: '3',
            userId: 1,
            articleId: 12
          }
        ])
      )
      .then(() => console.log('\x1b[32m', 'all tables has been successfully created with insert data'))
      .catch(error => console.log('This error occured', error));
});
