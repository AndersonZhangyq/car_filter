import * as dfd from "danfojs";

self.addEventListener('message', async function (MessageEvent) {
    // Contains the sum of the numbers in the given array5
    console.log(MessageEvent);
    const response = await fetch(MessageEvent.data.json_link);
    console.log(response);
    if (response.ok) {
        const property_value_set = {};
        const car_info = await response.json();
        const car_info_df = new dfd.DataFrame(car_info);
        for (const column_name of car_info_df.columns) {
            const cur_unique_series = car_info_df[column_name].unique();
            property_value_set[column_name] = cur_unique_series.to_json({
                download: false,
            })[0];
        }
    } else {
        console.log(response);
    }

    self.postMessage({
        "result": {
            car_info: car_info_df,
            property_value_set: property_value_set,
        }
    })

    console.log(MessageEvent);
}, false);