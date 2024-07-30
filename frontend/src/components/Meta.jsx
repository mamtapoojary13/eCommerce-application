/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

function Meta({
  title = "Welcome to MyShop",
  description = "We sell the best products for cheap",
  keywords = "electronics, buy electronics, cheap electronics",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

export default Meta;
