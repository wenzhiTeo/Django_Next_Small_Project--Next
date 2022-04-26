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
import Header from "../components/header";
import Link from "next/Link";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia:{
    paddingTop:"140%"
  }
}));

function Home({ posts }) {
  const classes = useStyles();

  return (
    <>
      <Header />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Link key={post.id} href={"/"}>
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

export async function getStaticProps() {
  const result = await fetch("http://127.0.0.1:8000/api/");
  const posts = await result.json();

  return {
    props: {
      posts,
    },
  };
}

export default Home;
