import React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { left, right } from "@popperjs/core";

export default function TodoForm() {
  const [items, setItems] = useState([{ item: "", text: "" }]);
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [name]: value };
    setItems(newItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddItem = () => {
    setItems([...items, { item: "", text: "" }]);
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div key={index}>
            {items.length === 1 ? (
              ""
            ) : (
              <ClearIcon
                onClick={() => handleDelete(index)}
                sx={{ float: "right" }}
              />
            )}
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id={`item-label-${index}`}>Todo</InputLabel>
              <Select
                labelId={`item-label-${index}`}
                id={`item-select-${index}`}
                name="item"
                value={item.item}
                label="item"
                onChange={(event) => handleChange(index, event)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Action Items">Action Items</MenuItem>
                <MenuItem value="Project Scope">Project Scope</MenuItem>
                <MenuItem value="Value Adds">Value Adds</MenuItem>
              </Select>

              <TextField
                id={`text-field-${index}`}
                name="text"
                value={item.text}
                label="Description"
                variant="outlined"
                onChange={(event) => handleChange(index, event)}
                sx={{ my: 2 }}
              />
            </FormControl>
          </div>
        ))}

        <Button variant="contained" type="submit" style={{ margin: "10px" }}>
          Submit
        </Button>
        <Button
          variant="contained"
          type="button"
          color="success"
          onClick={handleAddItem}
        >
          Add
        </Button>
      </form>
    </>
  );
}
