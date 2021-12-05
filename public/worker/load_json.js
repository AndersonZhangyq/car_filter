importScripts("https://cdn.jsdelivr.net/npm/danfojs@0.3.3/lib/bundle.min.js");

self.addEventListener('message', async function (event) {
    // Contains the sum of the numbers in the given array5
    console.log(event);
    const response = await fetch(event.data.json_link);
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

        self.postMessage({
            car_info: car_info,
            property_value_set: property_value_set,

        })
    } else {
        console.log(response);
    }
}, false);