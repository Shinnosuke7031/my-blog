import React, { FC } from 'react';
import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Links = [
  { text: 'Articles', path: '/articles' },
  { text: 'Profile', path: '/about-me' },
  { text: 'About This Site', path: '/about-site' },
  { text: 'Contact', path: '/contact' },
];

const HeaderMenu: FC = () => {
  return (
    <div className="container">
      <List>
        {Links.map((link, index) => (
          <ListItem
            divider={true}
            button
            key={index}
            style={{ cursor: 'pointer' }}
          >
            <Link href={link.path}>
              <ListItemText primary={link.text} />
            </Link>
          </ListItem>
        ))}
      </List>

      <style jsx>{``}</style>
    </div>
  );
};

export default HeaderMenu;
