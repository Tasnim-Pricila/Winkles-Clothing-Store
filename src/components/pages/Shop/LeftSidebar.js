import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup } from '@mui/material';


const LeftSidebar = ({ setCategory, setGtPrice, setStock, brand, setBrand, setLtPrice,handleClear }) => {
    return (
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>Search Results: </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right'}}>
                    <Button onClick={handleClear}> Clear Filters: </Button>

                </Grid>
            </Grid>
            <Typography>Filters: </Typography>
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
                            <FormControlLabel value="In Stock" control={<Radio />} label="In Stock" onChange={(e) => setStock(e.target.value)} />
                            <FormControlLabel value="Out of Stock" control={<Radio />} label="Out of Stock" onChange={(e) => setStock(e.target.value)} />
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
                            onChange={(e) => setGtPrice(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start" >$</InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>
                    <Typography>To</Typography>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            onChange={(e) => setLtPrice(e.target.value)}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>

                </AccordionDetails>
            </Accordion>
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>Categories</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Men" label="Men" control={<Radio />} onChange={(e) => setCategory(e.target.value)} />
                            <FormControlLabel value="Women" label="Women" control={<Radio />} onChange={(e) => setCategory(e.target.value)} />
                            <FormControlLabel value="Kids" label="Kids" control={<Radio />} onChange={(e) => setCategory(e.target.value)} />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel4a-header"
                >
                    <Typography>Brands</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="Style Echo" label="Style Echo" control={<Radio />} onChange={(e) => setBrand(e.target.value)} />
                        <FormControlLabel value="Arong" label="Arong" control={<Radio />} onChange={(e) => setBrand(e.target.value)} />
                        <FormControlLabel value="Shorodindu" label="Shorodindu" control={<Radio />} onChange={(e) => setBrand(e.target.value)} />
                        <FormControlLabel value="Jens" label="Jens" control={<Radio />} onChange={(e) => setBrand(e.target.value)} />
                        <FormControlLabel value="Cloth Villa" label="Cloth Villa" control={<Radio />} onChange={(e) => setBrand(e.target.value)} />
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default LeftSidebar;