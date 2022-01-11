import * as dfd from "danfojs";

self.addEventListener('message', async function (event) {
  // Contains the sum of the numbers in the given array5
  console.log(event);
  let car_info = []
  for (const link of event.data.json_links) {
    const response = await fetch(link);
    const res_json = await response.json();
    car_info = car_info.concat(res_json);
  }
  const property_value_set = {};
  const car_info_df = new dfd.DataFrame(car_info);
  for (const column_name of car_info_df.columns) {
    const cur_unique_series = car_info_df[column_name].unique().sort_values();
    property_value_set[column_name] = cur_unique_series.to_json({
      download: false,
    })[0];
  }

  self.postMessage({
    car_info: car_info,
    property_value_set: property_value_set,

  })
}, false);
