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

  const unique_series_id = new Set();
  car_info = car_info.filter(car => {
    if (unique_series_id.has(car.car_id))
      return false;
    unique_series_id.add(car.car_id);
    return true;
  });

  let rank_info = await get_sale_rank(event.data.origin);
  let oil_rank = await get_oil_rank(event.data.origin);
  for (const series_id in rank_info) {
    if (oil_rank.hasOwnProperty(series_id)) {
      rank_info[series_id].push(oil_rank[series_id]);
    }
  }

  self.postMessage({
    car_info: car_info,
    property_value_set: property_value_set,
    rank_info: rank_info,
  })
}, false);

const get_sale_rank = async (origin) => {
  const url =
    "https://delicate-river-9bed.justforssr.workers.dev/corsproxy/?apiurl=https://ib-lq.snssdk.com/motor/brand/v6/select/series/v2";
  let postBody = {
    limit: 10000,
    is_refresh: 0,
    offset: 0,
    sort_new: ["sale_desc"],
    price: "0,30"
  };
  const response = await fetch(url, {
    method: "POST",
    // mode: "no-cors",
    headers: {
      Origin: origin,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams(postBody).toString(),
  });
  var body = await response.json();
  var { series } = body.data;
  var ret = {};
  for (const { concern_id, rank_info } of series) {
    ret[concern_id] = [rank_info[0]];
  }
  return ret;
}

const get_oil_rank = async (origin) => {
  const url =
    "https://delicate-river-9bed.justforssr.workers.dev/corsproxy/?apiurl=https://ib-lq.snssdk.com/motor/brand/v6/select/series/v2";
  let postBody = {
    limit: 10000,
    is_refresh: 0,
    offset: 0,
    sort_new: ["oil_asc"],
    price: "0,30"
  };
  const response = await fetch(url, {
    method: "POST",
    // mode: "no-cors",
    headers: {
      Origin: origin,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams(postBody).toString(),
  });
  var body = await response.json();
  var { series } = body.data;
  var ret = {};
  for (const { concern_id, rank_info } of series) {
    ret[concern_id] = rank_info[0];
  }
  return ret;
}