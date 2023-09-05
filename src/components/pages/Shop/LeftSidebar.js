import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { fetchBrands } from "../../../Redux/actions/brandActions";
import { fetchCategories } from "../../../Redux/actions/categoryActions";
import {
  setBrand,
  setCategory,
  setGtPrice,
  setLtPrice,
  setStock,
} from "../../../Redux/actions/productActions";
import { memo } from "react";

const LeftSidebar = ({ handleClear }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands.brands);
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box mb={6}>
      <Grid container>
        <Grid item xs={6}>
          <Typography>Filters </Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Link
            sx={{
              cursor: "pointer",
              color: "#4b38b3",
              fontSize: "14px",
              textDecorationColor: "#4b38b3",
            }}
            onClick={handleClear}
          >
            Clear All
          </Link>
        </Grid>
      </Grid>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Availability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="In Stock"
                control={<Radio />}
                label="In Stock"
                onChange={(e) => dispatch(setStock(e.target.value))}
              />
              <FormControlLabel
                value="Out of Stock"
                control={<Radio />}
                label="Out of Stock"
                onChange={(e) => dispatch(setStock(e.target.value))}
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>From</Typography>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              onChange={(e) => dispatch(setGtPrice(e.target.value))}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
          <Typography>To</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              onChange={(e) => dispatch(setLtPrice(e.target.value))}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ height: "28vh", overflowY: "scroll" }}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {categories.map((category) => (
                <FormControlLabel
                  key={category?._id}
                  value={category.name}
                  label={category.name}
                  sx={{ textTransform: "capitalize" }}
                  control={<Radio />}
                  onChange={(e) => dispatch(setCategory(e.target.value))}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel4a-header"
        >
          <Typography>Brands</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ height: "28vh", overflowY: "scroll" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {brands.map((brand) => (
              <FormControlLabel
                key={brand?._id}
                value={brand.name}
                label={brand.name}
                sx={{ textTransform: "capitalize" }}
                control={<Radio />}
                onChange={(e) => dispatch(setBrand(e.target.value))}
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default memo(LeftSidebar) ;
