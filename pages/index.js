import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";

import DataFetcher from "../components/dataFetcher";

const styles = {
  cardRoot: {
    height: "80vh",
  },
  card: {},
  cardHead: {
    temperature: {
      backgroundColor: red[400],
    },
    humidity: {
      backgroundColor: green[400],
    },
  },
};

class Index extends React.Component {
  state = {
    humidity: 0,
    temperature: 0,
    lastUpdated: 0,
  };

  componentDidMount() {
    new DataFetcher(this.setState);
    setInterval(() => {
      this.setState({ ...this.state, lastUpdated: this.state.lastUpdated + 1 });
    }, 1000);
  }

  render() {
    return (
      <Grid
        style={styles.cardRoot}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid container direction="row" justify="center" spacing={5}>
          <Grid item>
            <Card style={styles.card} color="red">
              <CardHeader
                style={styles.cardHead.temperature}
                title="Temperature"
                subheader={`Updated ${this.state.lastUpdated} seconds ago`}
                titleTypographyProps={{ variant: "h4" }}
              ></CardHeader>
              <CardContent>
                <Typography variant="h1">{this.state.temperature}°C</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card style={styles.card}>
              <CardHeader
                style={styles.cardHead.humidity}
                title="Humidity"
                subheader={`Updated ${this.state.lastUpdated} seconds ago`}
                titleTypographyProps={{ variant: "h4" }}
              ></CardHeader>
              <CardContent>
                <Typography variant="h1">{this.state.humidity}%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Index;
