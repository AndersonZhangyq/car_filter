/*
export function someMutation (state) => {
}
*/

export const updateSelectedCarIds = (state, payload) => {
  state.selected_car_ids = payload;
}

export const updateHiddenSeries = (state, payload) => {
  state.hidden_series = payload;
}

export const deleteHiddenSeries = (state, payload) => {
  delete state.hidden_series[payload]
}

export const deletePropertyFilterList = (state, payload) => {
  delete state.property_filter_list[payload]
}

export const deletePropertyFilterListByKey = (state, {
  group_name,
  item_name,
  value,
}) => {
  state.property_filter_list[item_name].value = state.property_filter_list[item_name].value.filter(
    (item) => {
      if (typeof item === 'object') {
        return item['option'] !== value;
      }
      return item !== value;
    }
  )
}

export const deletePropertyFilterDisplay = (state, payload) => {
  delete state.property_filter_display[payload]
}

export const addHiddenSeries = (state, { key, value }) => {
  state.hidden_series[key] = value
}

export const updatePropertyFilterList = (state, {
  key,
  value,
  isRawValue,
  text,
  group_name
}) => {
  if (key === "dealer_price") {
    state.property_filter_list[key] = { isRawValue: isRawValue, value: value };
    state.property_filter_display[key] = {
      text: value.includes("-")
        ? `${text}: ${value} 万`
        : `${text}: ${value} 万以下`,
      isRawValue: isRawValue,
      group_name: group_name,
    };
  } else if (typeof value === "boolean") {
    if (value === true) {
      state.property_filter_list[key] = true;
      state.property_filter_display[key] = {
        key: key,
        text: text,
        group_name: group_name,
      };
    } else {
      delete state.property_filter_list[key];
      delete state.property_filter_display[key];
    }
  } else if (typeof value === "object") {
    if (value.length === 0) {
      delete state.property_filter_list[key];
      delete state.property_filter_display[key];
    } else {
      state.property_filter_list[key] = { isRawValue: isRawValue, value: value };
      if (isRawValue) {
        for (const value_item of value) {
          state.property_filter_display[value_item] = {
            text: `${text}: ${value_item}`,
            isRawValue: isRawValue,
            key: key,
            group_name: group_name,
          };
        }
      } else {
        for (const value_item of value) {
          state.property_filter_display[value_item["option"]] = {
            text: `${text}: ${value_item["label"]}`,
            isRawValue: isRawValue,
            parent: key,
            group_name: group_name,
          };
        }
      }
    }
  }
}

export const removePropertyFilter = (state, { detail }) => {
  if (typeof detail["value"] === "string") {
    delete state.property_filter_display[detail["value"]];
  } else {
    delete state.property_filter_display[detail["value"]["option"]];
  }
}
