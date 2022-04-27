import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/header";
import Link from "next/Link";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "140%",
  },
}));

function Home({ posts, categories }) {
  const classes = useStyles();
  const router = useRouter();

  // to waiting the resource being fetch
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header data={categories} />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/product/${encodeURIComponent(post.slug)}`}
              >
                <Grid item xs={6} sm={4} md={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={post.product_image[0].image}
                      alt={post.product_image}
                    ></CardMedia>
                    <CardContent>
                      <Typography gutterBottom component="p">
                        {post.title}
                      </Typography>
                      <Box component="p" fontSize={16} fontWeight={900}>
                        RM{post.regular_price}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}

//Pre fetch purpose
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const result = await fetch(
    `http://127.0.0.1:8000/api/category/${params.slug}`
  );
  const posts = await result.json();

  const category_result = await fetch("http://127.0.0.1:8000/api/category/");
  const categories = await category_result.json();

  return {
    props: {
      posts,
      categories,
    },
  };
}

export default Home;
