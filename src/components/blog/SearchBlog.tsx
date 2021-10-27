import React, { FC, Fragment, useMemo, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      textAlign: 'center',
    },
  }),
);

type typeElement = {
  slug: any;
  title: any;
  description: any;
  date: any;
  type: any;
  tag: any;
  imgpath: any;
};

type typeProps = {
  blogMetaData: typeElement[];
  isTagDisplayed: boolean;
};

const SerchBlog: FC<typeProps> = (props) => {
  const classes = useStyles();
  const isTagDisplayed = useMediaQuery({ query: '(min-width: 1100px)' });

  const [filterQuery, setFilterQuery] = useState('');

  const filteredBlog = useMemo(() => {
    let tmpBlogs = props.blogMetaData;

    tmpBlogs = tmpBlogs.filter((el) => {
      const isTagIncluded = el.tag.map((e: any) =>
        e.toLowerCase().includes(filterQuery.toLowerCase()),
      );
      return (
        el.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        isTagIncluded.includes(true)
      );
    });

    if (filterQuery === '') return [];
    else return tmpBlogs;
  }, [filterQuery, props.blogMetaData]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFilterQuery(value);
  };

  return (
    <Fragment>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="記事検索"
          variant="outlined"
          value={filterQuery}
          onChange={handleFilter}
        />
      </form>

      <ul>
        {filteredBlog.map((blog, index) => (
          <li
            key={index}
            className={
              index === filteredBlog.length - 1 ? 'borderTop end' : 'borderTop'
            }
          >
            <Link href={`/blog/${blog.slug}`}>
              <a>
                <img src={blog.imgpath} width="50px" height="50px" />
                <p className={props.isTagDisplayed ? 'title' : 'titleforNoTag'}>
                  {blog.title}
                </p>
                {props.isTagDisplayed && isTagDisplayed && (
                  <div className="tags">
                    {blog.tag.map((tag, index) =>
                      index === blog.tag.length - 1 ? (
                        <span className="tag" key={index}>
                          {tag}
                        </span>
                      ) : (
                        <span
                          className="tag"
                          style={{ margin: '0 0.5rem 0 0' }}
                          key={index}
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                )}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          width: 100%;
        }
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .title {
          width: 50%;
          margin: 0 0 0 1rem;
        }
        .titleforNoTag {
          width: 90%;
          margin: 0 0 0 1rem;
        }
        .tags {
          width: 20%;
          text-align: right;
        }
        .tag {
          border-radius: 0.3rem;
          color: #ffffff;
          background-color: #0051ff;
          padding: 0 0.3rem;
        }
        .borderTop {
          border-top: 1px solid gray;
        }
        .end {
          border-bottom: 1px solid gray;
        }
        @media screen and (max-width: 1100px) {
          .title {
            width: 90%;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default SerchBlog;
