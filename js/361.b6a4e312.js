(self["webpackChunkcar_filter"]=self["webpackChunkcar_filter"]||[]).push([[361],{57457:(e,_,t)=>{"use strict";t.r(_),t.d(_,{default:()=>N});var r=t(83673),a=t(62323);const s={class:"column offset-2 col-10"},i={class:"row q-col-gutter-xs"},o={class:"row items-center q-gutter-md"},n={class:"col-auto text-black"},l={class:"q-pa-md"},c={class:"row"},d={class:"column"},u={class:"col-2 text-h5"},p={class:"col-10 row q-col-gutter-xs items-center"},m={key:0,class:"col-md-2 col-sm-4"},v={id:"carInfo",class:"row q-col-gutter-md items-stretch"},x={class:"text-h6 text-center"};function h(e,_,t,h,b,g){const y=(0,r.up)("q-chip"),f=(0,r.up)("q-btn"),w=(0,r.up)("q-toolbar"),k=(0,r.up)("q-header"),z=(0,r.up)("q-select"),j=(0,r.up)("q-checkbox"),C=(0,r.up)("q-input"),A=(0,r.up)("q-card-section"),D=(0,r.up)("q-list"),q=(0,r.up)("q-item-label"),V=(0,r.up)("q-item-section"),S=(0,r.up)("q-item"),R=(0,r.up)("q-card"),P=(0,r.up)("q-page-container"),T=(0,r.up)("q-layout");return(0,r.wg)(),(0,r.j4)(T,{view:"lHh Lpr lFf"},{default:(0,r.w5)((()=>[(0,r.Wm)(k,{class:"bg-blue-grey-1",id:"head"},{default:(0,r.w5)((()=>[(0,r.Wm)(w,{class:"q-pa-md"},{default:(0,r.w5)((()=>[(0,r._)("div",s,[(0,r._)("div",i,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.property_filter_display,((_,t)=>((0,r.wg)(),(0,r.j4)(y,{removable:"",onRemove:r=>e.removeProperty(t,_),key:t,outline:"",color:"primary","text-color":"white"},{default:(0,r.w5)((()=>[(0,r.Uk)((0,a.zw)(_["text"]),1)])),_:2},1032,["onRemove"])))),128))]),(0,r._)("div",o,[(0,r.Wm)(f,{class:"col-sm-2 col-md-1",color:"primary",onClick:e.scrollToCarInfo,label:"Apply"},null,8,["onClick"]),(0,r._)("div",n," 共 "+(0,a.zw)(e.data.series_num)+" 车系 "+(0,a.zw)(e.data.car_num)+" 车型 ",1)])])])),_:1})])),_:1}),(0,r.Wm)(P,null,{default:(0,r.w5)((()=>[(0,r._)("div",l,[(0,r._)("div",c,[(0,r._)("div",d,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.data.property_group_refined,((_,t)=>((0,r.wg)(),(0,r.iD)("div",{class:"col-auto row items-center q-pb-md",key:t},[(0,r._)("div",u,(0,a.zw)(t.endsWith("-tf")?t.slice(0,-3):t),1),(0,r._)("div",p,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(_,((_,a)=>((0,r.wg)(),(0,r.iD)(r.HY,{key:a},["sub_list"in _?((0,r.wg)(),(0,r.iD)("div",m,[(0,r.Wm)(z,{filled:0!==e.property_filter[t][a].length,outlined:0===e.property_filter[t][a].length,modelValue:e.property_filter[t][a],"onUpdate:modelValue":[_=>e.property_filter[t][a]=_,r=>e.updatePropertyFilterList(a,e.property_filter[t][a],!1,_["text"],t)],multiple:"",options:(e=>Object.keys(e).map((_=>({option:_,label:e[_]}))))(_["sub_list"]),label:_["text"],onRemove:e.removePropertyFilter},null,8,["filled","outlined","modelValue","onUpdate:modelValue","options","label","onRemove"])])):((0,r.wg)(),(0,r.iD)("div",{class:"col-md-2 col-sm-4",key:a},[t.endsWith("-tf")?((0,r.wg)(),(0,r.j4)(j,{key:0,modelValue:e.property_filter[t][a],"onUpdate:modelValue":[_=>e.property_filter[t][a]=_,r=>e.updatePropertyFilterList(a,e.property_filter[t][a],!1,_["text"],t)],label:_["text"]},null,8,["modelValue","onUpdate:modelValue","label"])):((0,r.wg)(),(0,r.iD)(r.HY,{key:1},["dealer_price"==a?((0,r.wg)(),(0,r.j4)(C,{key:0,type:"number",modelValue:e.property_filter[t][a],"onUpdate:modelValue":_=>e.property_filter[t][a]=_,modelModifiers:{number:!0},label:"经销商报价（万）",onBlur:r=>e.updatePropertyFilterList(a,e.property_filter[t][a],!0,_["text"],t)},null,8,["modelValue","onUpdate:modelValue","onBlur"])):((0,r.wg)(),(0,r.j4)(z,{key:1,filled:0!==e.property_filter[t][a].length,outlined:0===e.property_filter[t][a].length,modelValue:e.property_filter[t][a],"onUpdate:modelValue":[_=>e.property_filter[t][a]=_,r=>e.updatePropertyFilterList(a,e.property_filter[t][a],!0,_["text"],t)],multiple:"",options:e.property_value_set[a],label:_["text"],onRemove:e.removePropertyFilter},null,8,["filled","outlined","modelValue","onUpdate:modelValue","options","label","onRemove"]))],64))]))],64)))),128))])])))),128))])]),(0,r._)("div",v,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.data.car_info_filtered,((e,_)=>((0,r.wg)(),(0,r.iD)("div",{class:"col-md-3 col-sm-6",key:_},[(0,r.Wm)(R,{class:"full-height"},{default:(0,r.w5)((()=>[(0,r.Wm)(A,null,{default:(0,r.w5)((()=>[(0,r._)("div",x,(0,a.zw)(_),1)])),_:2},1024),(0,r.Wm)(A,null,{default:(0,r.w5)((()=>[(0,r.Wm)(D,{bordered:"",separator:""}),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e,(e=>((0,r.wg)(),(0,r.j4)(S,{key:e["car_name"]},{default:(0,r.w5)((()=>[(0,r.Wm)(V,null,{default:(0,r.w5)((()=>[(0,r.Wm)(q,null,{default:(0,r.w5)((()=>[(0,r.Uk)((0,a.zw)(`${e["car_year"]} ${e["car_name"]}`),1)])),_:2},1024)])),_:2},1024),(0,r.Wm)(V,{side:""},{default:(0,r.w5)((()=>[(0,r.Wm)(q,{caption:""},{default:(0,r.w5)((()=>[(0,r.Uk)((0,a.zw)(e["dealer_price"]),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:2},1024)])),_:2},1024)])))),128))])])])),_:1})])),_:1})}t(10071),t(17965),t(66016),t(92100);var b=t(61959),g=t(38400),y=t(48825),f=t(34747);const w=JSON.parse('{"基本信息":{"official_price":{"text":"官方指导价"},"sub_brand_name":{"text":"厂商"},"jb":{"text":"级别"},"fuel_form":{"text":"能源类型"},"market_time":{"text":"上市时间"},"engine_description":{"text":"发动机"},"energy_elect_max_power":{"text":"最大功率(kW)"},"energy_elect_max_torque":{"text":"最大扭矩(N·m)"},"gearbox_description":{"text":"变速箱"},"length_width_height":{"text":"长x宽x高(mm)"},"car_body_struct":{"text":"车身结构"},"max_speed":{"text":"最高车速(Km/h)"},"acceleration_time":{"text":"官方百公里加速时间(s)"},"fuel_comprehensive":{"text":"NEDC综合油耗(L/100km)"},"power_consumption_v3":{"text":"百公里耗电量(kWh/100km)"},"constant_speed_mileage":{"text":"等速续航里程(km)"},"period":{"text":"整车保修期限"},"wltc_fuel_comprehensive":{"text":"WLTC综合油耗(L/100km)"},"electric_description":{"text":"电动机"},"recharge_mileage":{"text":"纯电续航里程(km)"},"battery_charge_time":{"text":"充电时间(小时)"},"fast_charge_electricity":{"text":"快充电量(%)"},"fuel_consumption":{"text":"官方油耗(L)"}},"车身":{"length":{"text":"长(mm)"},"width":{"text":"宽(mm)"},"height":{"text":"高(mm)"},"wheelbase":{"text":"轴距(mm)"},"front_track":{"text":"前轮距(mm)"},"rear_track":{"text":"后轮距(mm)"},"min_clearance":{"text":"最小离地间隙(mm)"},"body_struct":{"text":"车身结构"},"door_nums":{"text":"车门数(个)"},"door_open_way":{"text":"车门开启方式"},"seat_count":{"text":"座位数(个)"},"curb_weight":{"text":"整备质量(Kg)"},"full_load_weight":{"text":"满载质量(Kg)"},"oil_tank_volume":{"text":"油箱容积(L)"},"baggage_volume":{"text":"行李舱容积(L)"},"drag_coefficient":{"text":"风阻系数(Cd)"},"approach_angle":{"text":"接近角(°)"},"departure_angle":{"text":"离去角(°)"},"max_grade":{"text":"最大爬坡度(%)"},"max_load_weight":{"text":"最大载重质量(Kg)"},"traction_weight":{"text":"牵引重量(kg)"},"container_length_width_height":{"text":"货箱长×宽×高(mm)"}},"发动机":{"model":{"text":"发动机型号"},"cylinder_volume_ml":{"text":"排量(mL)"},"capacity_l":{"text":"排量(L)"},"gas_form":{"text":"进气形式"},"cylinder_arrangement":{"text":"气缸排列形式"},"cylinder_nums":{"text":"气缸数(个)"},"valves_per_cylinder_nums":{"text":"每缸气门数(个)"},"compression_ratio_s":{"text":"压缩比"},"air_supply":{"text":"配气机构"},"max_horsepower":{"text":"最大马力(Ps)"},"max_power":{"text":"最大功率(kW)","sub_list":{"max_power_revolution":"max_power_revolution"}},"max_torque":{"text":"最大扭矩(N·m)","sub_list":{"max_torque_revolution":"max_torque_revolution"}},"unique_tech":{"text":"发动机特有技术"},"fuel_form":{"text":"燃料形式"},"fuel_label":{"text":"燃油标号"},"oil_supply":{"text":"供油方式"},"cylinder_head_material":{"text":"缸盖材料"},"cylinder_material":{"text":"缸体材料"},"environmental_standards":{"text":"环保标准"}},"电动机":{"electric_description":{"text":"电动机描述"},"electric_type":{"text":"电机类型"},"total_electric_power":{"text":"电动机总功率(kW)"},"front_electric_max_horsepower":{"text":"电动机总马力(Ps)"},"total_electric_torque":{"text":"电动机总扭矩(N·m)"},"front_electric_max_power":{"text":"前电动机最大功率(kW)"},"front_electric_max_torque":{"text":"前电动机最大扭矩(N·m)"},"rear_electric_max_power":{"text":"后电动机最大功率(kW)"},"rear_electric_max_torque":{"text":"后电动机最大扭矩(N·m)"},"system_power":{"text":"系统综合功率(kW)"},"system_torque":{"text":"系统综合扭矩(N·m)"},"electric_drive_number":{"text":"驱动电机数"},"electric_layout":{"text":"电机布局"}},"电池/充电":{"battery_type_v3":{"text":"电池类型"},"battery_warranty_v3":{"text":"电池组质保"},"battery_capacity":{"text":"电池容量(kWh)"},"battery_energy_density_v3":{"text":"电池能量密度(Wh/kg)"},"battery_charge":{"text":"电池充电","sub_list":{"battery_charge_time":"充电时间","quick_charge_interface_v3":"快充接口"}},"battery_temperature_management_system":{"text":"电池温度管理系统","sub_list":{"battery_temperature_management_system_heating_v3":"低温加热","battery_temperature_management_system_cooling_v3":"液态冷却"}},"charging_pile":{"text":"充电桩"}},"变速箱":{"gearbox_description":{"text":"变速箱描述"},"stalls":{"text":"挡位数"},"gearbox_type":{"text":"变速箱类型"}},"底盘/转向":{"driver_form":{"text":"驱动方式"},"fourwheel_drive_type":{"text":"四驱类型"},"central_differential_structure":{"text":"中央差速器结构"},"front_suspension_form":{"text":"前悬挂形式"},"rear_suspension_form":{"text":"后悬挂形式"},"power_steering_type":{"text":"转向类型"},"car_body_structure":{"text":"车体结构"}},"车轮/制动":{"front_brake_type":{"text":"前制动器类型"},"rear_brake_type":{"text":"后制动器类型"},"park_brake_type":{"text":"驻车制动类型"},"front_tire_size":{"text":"前轮胎规格尺寸"},"rear_tire_size":{"text":"后轮胎规格尺寸"},"spare_tire_specification":{"text":"备胎规格","sub_list":{"spare_tire_specification_2":"非全尺寸","spare_tire_specification_1":"全尺寸","spare_tire_specification_3":"未知"}},"spare_tire_placement_v3":{"text":"备胎放置方式","sub_list":{"spare_tire_placement_v3_3":"隐藏式","spare_tire_placement_v3_1":"背负式","spare_tire_placement_v3_2":"底挂式"}}},"主动安全-tf":{"abs_anti_lock":{"text":"ABS防抱死"},"brake_force":{"text":"制动力分配(EBD/CBC等)"},"brake_assist":{"text":"刹车辅助(EBA/BA等)"},"traction_control":{"text":"牵引力控制(TCS/ASR等)"},"body_stability_system":{"text":"车身稳定系统(ESP/DSC等)"},"car_warning_system":{"text":"主动安全预警系统","sub_list":{"lane_warning_system":"车道偏离预警","front_collision_warning":"前方碰撞预警","rear_traffic_warning":"后方交通预警","reversing_warning_system_v2":"倒车车侧预警","dow_open_door_warning_system_v3":"DOW开门预警"}},"active_brake":{"text":"主动刹车"},"line_support":{"text":"并线辅助"},"lane_keeping_assist_v2":{"text":"车道保持辅助系统"},"fatigue_driving_warning":{"text":"疲劳驾驶提示"},"road_traffic_sign_recognition_v2":{"text":"道路交通标识识别"},"night_vision_system":{"text":"夜视系统"}},"被动安全-tf":{"main_vice_airbag":{"text":"前排安全气囊","sub_list":{"main_airbag":"主驾驶位","vice_airbag":"副驾驶位"}},"front_rear_airbag":{"text":"侧安全气囊","sub_list":{"front_airbag":"前排","rear_airbag":"后排"}},"side_air_curtain":{"text":"侧安全气帘"},"main_vice_knee_airbag":{"text":"前排膝部气囊","sub_list":{"main_knee_airbag":"主驾驶位","vice_knee_airbag":"副驾驶位"}},"vice_cushion_airbag_v3":{"text":"副驾驶座垫式气囊"},"front_near_center_airbag":{"text":"中央安全气囊","sub_list":{"front_center_airbag_v2":"前排","rear_center_airbag_v2":"后排"}},"rear_front_airbag":{"text":"后排正向安全气囊"},"rear_seat_belt":{"text":"后排气囊式安全带"},"rear_anti_slide_airbag_v3":{"text":"后排座椅防下滑气囊"},"seat_belt_prompted":{"text":"安全带未系提示"},"child_seat_interface":{"text":"儿童座椅接口(ISOFIX)"},"passive_pedestrian_protection_v2":{"text":"被动行人保护"},"explosion_tire":{"text":"安全轮胎"},"tire_pressure_system_v2":{"text":"胎压监测系统","sub_list":{"tire_pressure_system_v2_2":"胎压显示","tire_pressure_system_v2_1":"胎压报警"}}},"辅助/操控配置-tf":{"parking_radar":{"text":"驻车雷达","sub_list":{"front_parking_radar":"前","rear_parking_radar":"后"}},"driving_assistant_camera":{"text":"驾驶辅助影像","sub_list":{"reversing_camera":"倒车影像","fade_zone_camera_v2":"车侧盲区影像","panoramic_camera":"360°全景影像"}},"cruise_system":{"text":"巡航系统","sub_list":{"cruise":"定速巡航","adaptive_cruise":"自适应巡航","full_speed_adaptive_cruise_v3":"全速自适应巡航"}},"automatic_drive_level_v2":{"text":"自动驾驶级别","sub_list":{"automatic_drive_level_v2_1":"L0级","automatic_drive_level_v2_3":"L2级","automatic_drive_level_v2_2":"L1级","automatic_drive_level_v2_4":"L3级"}},"auto_park_entry":{"text":"自动泊车入位"},"auto_park":{"text":"自动驻车(AUTOHOLD)"},"uphill_support":{"text":"上坡辅助(HAC)"},"steep_slope":{"text":"陡坡缓降(HDC)"},"engine_sas_tech":{"text":"发动机启停技术"},"air_suspension":{"text":"空气悬挂"},"electromagnetic_induct_suspension":{"text":"电磁感应悬挂"},"variable_steer_system":{"text":"可变转向比系统"},"central_differential_lock":{"text":"中央差速器锁止功能"},"overall_turn":{"text":"整体主动转向系统"},"drive_mode_v2":{"text":"驾驶模式选择","sub_list":{"drive_mode_v2_2":"ECO","drive_mode_v2_1":"运动","drive_mode_v2_3":"标准舒适","drive_mode_v2_4":"雪地","drive_mode_v2_5":"越野","drive_mode_v2_6":"个性化"}},"four_wd_low":{"text":"低速四驱"},"wade_sensing_system_v3":{"text":"涉水感应系统"},"variable_suspension_2":{"text":"可变悬挂调节"},"brake_energy_regeneration_v3":{"text":"制动能量回收系统"},"low_speed_driving_warning_v3":{"text":"低速行车警示音"},"front_slip_method_2":{"text":"前桥限滑方式"},"variable_suspension_3":{"text":"可变悬挂调节(软硬+高低)"},"rear_slip_method":{"text":"后桥限滑方式","sub_list":{"rear_slip_method_2":"差速锁","rear_slip_method_3":"限滑差速器+差速锁","rear_slip_method_1":"rear_slip_method_1"}}},"外部配置-tf":{"skylight_type_v2":{"text":"天窗类型","sub_list":{"skylight_type_v2_1":"单天窗","skylight_type_v2_3":"可开启全景天窗","skylight_type_v2_5":"分段式可开启全景天窗","skylight_type_v2_4":"不可开启全景天窗","skylight_type_v2_6":"分段式不可开启全景天窗","skylight_type_v2_2":"全景天窗"}},"roof_racks":{"text":"车顶行李架"},"sports_appearance_kit":{"text":"运动外观套件"},"active_closed_inlet_grid_v3":{"text":"主动闭合式进气格栅"},"alloy_wheel":{"text":"铝合金轮毂"},"side_footrest_v3":{"text":"车侧脚踏板","sub_list":{"side_footrest_v3_2":"电动","side_footrest_v3_1":"固定"}},"sliding_door":{"text":"侧滑门","sub_list":{"sliding_door_1":"手动开闭","sliding_door_3":"单侧电动开闭","sliding_door_4":"双侧电动开闭","sliding_door_2":"电动开闭"}},"box_treasure":{"text":"货箱宝","sub_list":{"box_treasure_1":"喷涂式","box_treasure_2":"放置式"}}},"内部配置-tf":{"steer_wheel_material_v3":{"text":"方向盘材质","sub_list":{"steer_wheel_material_v3_1":"塑料","steer_wheel_material_v3_3":"真皮","steer_wheel_material_v3_2":"皮质","steer_wheel_material_v3_4":"Alcantara"}},"elec_steer_wheel_adjustment":{"text":"方向盘电动调节"},"steer_wheel_functional":{"text":"方向盘功能","sub_list":{"multifunction_steer_wheel":"多功能控制","steer_wheel_shift":"换挡","steer_wheel_memory":"记忆","steer_wheel_heating":"加热"}},"driving_computer_display_screen_v2":{"text":"行车电脑屏幕","sub_list":{"driving_computer_display_screen_v2_2":"单色","driving_computer_display_screen_v2_1":"彩色"}},"steer_wheel_adjustment":{"text":"方向盘调节","sub_list":{"steer_wheel_adjustment_3":"上下+前后","steer_wheel_adjustment_1":"上下","steer_wheel_adjustment_2":"前后"}},"lcd_dashboard_size_v2":{"text":"液晶仪表尺寸(in)","sub_list":{"lcd_dashboard_size_v2_4.2":"4.2","lcd_dashboard_size_v2_7":"7","lcd_dashboard_size_v2_未知":"未知","lcd_dashboard_size_v2_10.2":"10.2","lcd_dashboard_size_v2_8":"8","lcd_dashboard_size_v2_10.25":"10.25","lcd_dashboard_size_v2_3.5":"3.5","lcd_dashboard_size_v2_12.3":"12.3","lcd_dashboard_size_v2_10.3":"10.3","lcd_dashboard_size_v2_12":"12","lcd_dashboard_size_v2_10":"10","lcd_dashboard_size_v2_5":"5","lcd_dashboard_size_v2_2.3":"2.3","lcd_dashboard_size_v2_3.5+10.25+9.2":"3.5+10.25+9.2","lcd_dashboard_size_v2_4.5":"4.5","lcd_dashboard_size_v2_待查":"待查","lcd_dashboard_size_v2_4":"4","lcd_dashboard_size_v2_4.6":"4.6","lcd_dashboard_size_v2_6.5":"6.5","lcd_dashboard_size_v2_8.8":"8.8","lcd_dashboard_size_v2_9.2":"9.2","lcd_dashboard_size_v2_5.3":"5.3","lcd_dashboard_size_v2_10.1":"10.1","lcd_dashboard_size_v2_4.3":"4.3","lcd_dashboard_size_v2_2.5":"2.5","lcd_dashboard_size_v2_7.5":"7.5","lcd_dashboard_size_v2_6.2":"6.2","lcd_dashboard_size_v2_3+3":"3+3","lcd_dashboard_size_v2_6.3":"6.3","lcd_dashboard_size_v2_8.5":"8.5","lcd_dashboard_size_v2_4.2+4.2+7":"4.2+4.2+7","lcd_dashboard_size_v2_11":"11","lcd_dashboard_size_v2_9":"9","lcd_dashboard_size_v2_0":"lcd_dashboard_size_v2_0"}},"lcd_dashboard_type_v2":{"text":"液晶仪表样式","sub_list":{"lcd_dashboard_type_v2_2":"非全液晶","lcd_dashboard_type_v2_1":"全液晶"}}},"舒适/防盗配置-tf":{"electric_door":{"text":"电动吸合门"},"electric_back_door":{"text":"电动后尾门"},"inductive_back_door":{"text":"感应式后尾门"},"electric_back_door_memory_v2":{"text":"电动后尾门位置记忆"},"engine_anti_theft":{"text":"发动机电子防盗"},"central_locking_car":{"text":"车内中控锁"},"remote_key_v2":{"text":"遥控钥匙类型","sub_list":{"remote_key_v2_1":"普通遥控钥匙","remote_key_v2_3":"智能遥控钥匙","remote_key_v2_5":"手机蓝牙钥匙","remote_key_v2_4":"可穿戴钥匙","remote_key_v2_6":"NFC/RFID钥匙","remote_key_v2_2":"触控屏钥匙"}},"keyless_start":{"text":"无钥匙启动"},"engine_remote_start":{"text":"远程启动"},"remote_control_move_v3":{"text":"遥控移动车辆"},"car_call_v3":{"text":"车辆召唤功能"},"header_display_system":{"text":"抬头显示系统(HUD)"},"built_in_tachograph":{"text":"内置行车记录仪"},"active_noise_reduction":{"text":"主动降噪"},"mobile_wireless_charging":{"text":"手机无线充电"},"power_outlet":{"text":"110V/220V/230V电源插座"},"baggage_12v_power_outlet_v2":{"text":"行李舱12V电源接口"},"keyless_entry_v2":{"text":"无钥匙进入","sub_list":{"keyless_entry_v2_2":"前排","keyless_entry_v2_3":"主驾驶位","keyless_entry_v2_1":"全车"}}},"座椅配置-tf":{"seat_material":{"text":"座椅材质","sub_list":{"seat_material_2":"仿皮","seat_material_5":"真皮+仿皮","seat_material_3":"织物","seat_material_1":"真皮","seat_material_4":"皮织混搭"}},"sport_style_seat":{"text":"运动风格座椅"},"second_independent_seat":{"text":"第二排独立座椅"},"seat_electrical_adjustment":{"text":"座椅电动调节","sub_list":{"main_drive_seat_adjustment":"主驾驶位","vice_drive_seat_adjustment":"副驾驶位","second_row_seat_electrical_adjustment":"第二排"}},"main_drive_whole_adjustment":{"text":"主驾座椅整体调节","sub_list":{"main_drive_back_and_forth_adjustment_v2":"前后移动","main_drive_backrest_adjustment_v2":"靠背角度","main_drive_height_adjustment_v2":"高低调节"}},"main_drive_part_adjustment":{"text":"主驾座椅局部调节","sub_list":{"main_drive_pillow_adjustment_v2":"头枕","main_drive_waist_adjustment_v2":"腰部","main_drive_shoulder_adjustment_v2":"肩部","main_drive_leg_adjustment_v2":"腿托"}},"vice_drive_whole_adjustment":{"text":"副驾座椅整体调节","sub_list":{"vice_drive_back_and_forth_adjustment_v2":"前后移动","vice_drive_height_adjustment_v2":"高低调节","vice_drive_backrest_adjustment_v2":"靠背角度"}},"vice_drive_part_adjustment":{"text":"副驾座椅局部调节","sub_list":{"vice_drive_pillow_adjustment_v2":"头枕","vice_drive_waist_adjustment_v2":"腰部","vice_drive_shoulder_adjustment_v2":"肩部","vice_drive_leg_adjustment_v2":"腿托"}},"second_seat_control_functional":{"text":"第二排座椅整体调节","sub_list":{"second_row_seat_back_and_forth_adjustment":"前后移动","second_row_seat_backrest_adjustment":"靠背角度调节","co_pilot_rear_adjustable_button":"老板键","second_row_seat_rotation_adjustment_v3":"旋转调节"}},"second_local_seat":{"text":"第二排座椅局部调节","sub_list":{"second_row_seat_leg_adjustment_v3":"腿托","second_row_seat_shoulder_adjustment_v3":"肩部","second_row_seat_lumbar_adjustment_v3":"腰部","second_row_seat_head_adjustment_v3":"头枕"}},"front_seat_functional":{"text":"前排座椅功能","sub_list":{"front_seat_heating":"加热","front_seat_ventilation":"通风","front_seat_memory_v2":"记忆","front_seat_massage":"按摩"}},"rear_seat_functional":{"text":"第二排座椅功能","sub_list":{"rear_seat_heating":"加热","rear_seat_ventilation":"通风","second_row_seat_memory_v2":"记忆","rear_seat_massage":"按摩"}},"centre_armrest":{"text":"前/后扶手","sub_list":{"front_armrest":"前排","back_armrest":"后排"}},"rear_cup_holder":{"text":"后排杯架"},"hot_cold_cup_holder":{"text":"可加热/制冷杯架"},"second_row_small_desktop_v2":{"text":"第二排小桌板"},"second_row_seat_down_ratio":{"text":"后排座椅放倒比例","sub_list":{"second_row_seat_down_ratio_3":"40:60","second_row_seat_down_ratio_1":"整排放倒","second_row_seat_down_ratio_4":"50:50","second_row_seat_down_ratio_9":"40:20:40","second_row_seat_down_ratio_2":"30:70","second_row_seat_down_ratio_8":"比例放倒","second_row_seat_down_ratio_5":"35:30:35","second_row_seat_down_ratio_7":"左右对折"}},"third_seat_functional":{"text":"第三排座椅功能","sub_list":{"third_row_seat_heating_v3":"加热","third_row_seat_ventilation_v3":"通风","third_row_seat_massage_v3":"按摩"}},"rear_seat_electric_down_v3":{"text":"后排座椅电动放倒"},"seat_cork_style":{"text":"座椅皮质风格","sub_list":{"seat_cork_style_13":"vienna真皮","seat_cork_style_7":"Alcantara（麂皮）","seat_cork_style_1":"Nappa真皮","seat_cork_style_20":"Moli真皮","seat_cork_style_14":"Nubuck真皮","seat_cork_style_16":"Alcantara+Nappa真皮","seat_cork_style_4":"Dakota真皮","seat_cork_style_19":"Luxtec材质","seat_cork_style_28":"Milano真皮","seat_cork_style_12":"Claudia真皮","seat_cork_style_3":"Nevada真皮"}},"layout_seat":{"text":"座椅布局","sub_list":{"layout_seat_4":"2+3","layout_seat_8":"2+3+2","layout_seat_5":"2+2+2","layout_seat_6":"2+2+3","layout_seat_3":"2+2","layout_seat_9":"2+3+3","layout_seat_11":"2","layout_seat_12":"2+2+2+3","layout_seat_1":"1+2"}},"third_row_seat_count":{"text":"第三排座椅","sub_list":{"third_row_seat_count_3":"3座","third_row_seat_count_2":"2座","third_row_seat_count_23":"2/3座"}}},"智能互联-tf":{"gps":{"text":"GPS导航系统"},"navigation_system_v2":{"text":"导航路况信息展示"},"position_service":{"text":"道路救援服务"},"bluetooth_and_car_phone":{"text":"蓝牙/车载电话"},"mobile_system_v2":{"text":"手机互联映射","sub_list":{"mobile_system_v2_1":"CarPlay","mobile_system_v2_5":"原厂原机","mobile_system_v2_2":"CarLife","mobile_system_v2_3":"Android Auto","mobile_system_v2_8":"Hicar","mobile_system_v2_4":"斑马"}},"car_networking":{"text":"车联网"},"ota_upgrade_v3":{"text":"OTA升级"},"facial_recognition_v3":{"text":"面部识别"},"speech_recognition_system_v2":{"text":"语音识别控制系统"},"gesture_control_system_v2":{"text":"手势控制功能"},"wifi_v2":{"text":"Wi-Fi热点"},"center_screen":{"text":"中控彩色屏幕","sub_list":{"center_screen_1":"大屏","center_screen_2":"小屏","center_screen_size":"center_screen_size","center_screen_size_10.1吋":"center_screen_size_10.1吋","center_screen_size_10.25吋":"center_screen_size_10.25吋","center_screen_size_10.2吋":"center_screen_size_10.2吋","center_screen_size_10.4吋":"center_screen_size_10.4吋","center_screen_size_10吋":"center_screen_size_10吋","center_screen_size_12.3吋":"center_screen_size_12.3吋","center_screen_size_12.8吋":"center_screen_size_12.8吋","center_screen_size_12吋":"center_screen_size_12吋","center_screen_size_14.6吋":"center_screen_size_14.6吋","center_screen_size_7吋":"center_screen_size_7吋","center_screen_size_8.8吋":"center_screen_size_8.8吋","center_screen_size_8吋":"center_screen_size_8吋","center_screen_size_9吋":"center_screen_size_9吋","center_screen_size_待查吋":"center_screen_size_待查吋","center_screen_size_未知吋":"center_screen_size_未知吋"}},"center_down_screen_size_8吋":{"text":"中控下屏幕尺寸"},"center_down_screen_size_6吋":{"text":"中控下屏幕尺寸"},"center_down_screen_size_5.5吋":{"text":"中控下屏幕尺寸"},"center_down_screen_size_9吋":{"text":"中控下屏幕尺寸"},"center_down_screen_size_7吋":{"text":"中控下屏幕尺寸"},"center_down_screen_size_10.1吋":{"text":"中控下屏幕尺寸"},"center_down_screen_size_9.7吋":{"text":"中控下屏幕尺寸"},"vice_screen_size":{"text":"副驾驶屏幕尺寸","sub_list":{"vice_screen_size_9":"9","vice_screen_size_9吋":"9吋","vice_screen_size_10.25吋":"vice_screen_size_10.25吋","vice_screen_size_12.3吋":"vice_screen_size_12.3吋","vice_screen_size_8吋":"vice_screen_size_8吋"}}},"影音娱乐-tf":{"control_lcd_screen_display":{"text":"中控分屏显示"},"multimedia_interface":{"text":"多媒体接口","sub_list":{"multimedia_interface_1":"USB/Type-C","multimedia_interface_2":"AUX","multimedia_interface_4":"ipod","multimedia_interface_3":"SD卡槽","multimedia_interface_5":"HDMI"}},"usb_typec_interface_count":{"text":"USB/Type-C接口数量","sub_list":{"front_usb_typec_interface_count":"前排","rear_usb_typec_interface_count":"后排"}},"car_tv":{"text":"车载电视"},"rear_lcd_screen":{"text":"后排液晶屏"},"speaker":{"text":"扬声器数量(个)","sub_list":{"speaker_speaker_count_4":4,"speaker_speaker_count_8":8,"speaker_speaker_count_2":2,"speaker_speaker_count_6":6,"speaker_speaker_count_9":9,"speaker_speaker_count_10":10,"speaker_12":"12以上","speaker_10":"10-11","speaker_4":"4-5","speaker_speaker_count_15":15,"speaker_speaker_count_1":1,"speaker_speaker_count_12":12,"speaker_speaker_count_7":7,"speaker_speaker_count_11":11,"speaker_6":"6-7","speaker_speaker_count_5":5,"speaker_speaker_count_14":14,"speaker_speaker_count_18":18,"speaker_speaker_count_13":13,"speaker_speaker_count_17":17,"speaker_speaker_count_16":16,"speaker_8":"8-9","speaker_2":"2-3","speaker_speaker_count_3":3}},"rear_touch_control_system_v2":{"text":"后排多媒体控制"},"sound_brand":{"text":"音响品牌","sub_list":{"sound_brand_4":"B&O","sound_brand_3":"BOSE","sound_brand_13":"柏林之声","sound_brand_1":"哈曼卡顿","sound_brand_29":"丹拿","sound_brand_8":"JBL","sound_brand_12":"索尼","sound_brand_5":"Infinity","sound_brand_11":"英国之宝","sound_brand_7":"Beats","sound_brand_20":"劲浪","sound_brand_10":"阿尔派","sound_brand_17":"阿嘉米斯","sound_brand_16":"先锋","sound_brand_2":"sound_brand_2","sound_brand_21":"sound_brand_21","sound_brand_26":"sound_brand_26","sound_brand_32":"sound_brand_32"}},"audio_and_video_system":{"text":"影音系统","sub_list":{"audio_and_video_system_1":"单碟CD","audio_and_video_system_2":"单碟DVD"}}},"灯光配置-tf":{"high_headlamp_type":{"text":"远光灯","sub_list":{"high_headlamp_type_4":"卤素","high_headlamp_type_2":"LED","high_headlamp_type_1":"激光","high_headlamp_type_3":"氙气"}},"daytime_light":{"text":"日间行车灯"},"adaptive_light":{"text":"自适应远近光"},"auto_headlamp":{"text":"自动大灯"},"steer_assist_light":{"text":"转向辅助灯"},"front_fog_light":{"text":"前雾灯"},"headlamp_follow_up":{"text":"大灯随动转向(AFS)"},"headlight_height_adjustment":{"text":"大灯高度调节"},"headlight_clean_function":{"text":"大灯清洗功能"},"headlamp_delay_off_v3":{"text":"大灯延时关闭"},"headlamp_rain_fog_mode_v3":{"text":"前大灯雨雾模式"},"low_headlamp_type":{"text":"近光灯","sub_list":{"low_headlamp_type_2":"LED","low_headlamp_type_4":"卤素","low_headlamp_type_3":"氙气"}},"interior_light_v2":{"text":"车内氛围灯","sub_list":{"interior_light_v2_10色":"10色","interior_light_v2_11色":"11色","interior_light_v2_多色":"多色","interior_light_v2_72色":"72色","interior_light_v2_单色":"单色","interior_light_v2_64色":"64色","interior_light_v2_30色":"30色","interior_light_v2_32色":"32色","interior_light_v2_7色":"7色","interior_light_v2_256色":"256色","interior_light_v2_253色":"253色","interior_light_v2_6色":"6色","interior_light_v2_31色":"31色","interior_light_v2_3色":"3色","interior_light_v2_双色":"双色","interior_light_v2_2色":"2色","interior_light_v2_230色":"230色","interior_light_v2_8色":"8色","interior_light_v2_未知色":"未知色","interior_light_v2_12色":"12色","interior_light_v2_255色":"255色","interior_light_v2_单色色":"单色色","interior_light_v2_128色":"interior_light_v2_128色","interior_light_v2_16色":"interior_light_v2_16色"}},"light_special_function_v2":{"text":"灯光特色功能","sub_list":{"light_special_function_v2_矩阵式":"矩阵式","light_special_function_v2_像素式":"像素式","light_special_function_v2_几何多光束":"light_special_function_v2_几何多光束","light_special_function_v2_矩阵式 + 像素式":"light_special_function_v2_矩阵式 + 像素式"}}},"玻璃/后视镜-tf":{"electric_window":{"text":"电动车窗","sub_list":{"front_electric_window":"前排","rear_electric_window":"后排"}},"window_one_key_lift":{"text":"车窗一键升降","sub_list":{"window_one_key_lift_1":"前排","window_one_key_lift_2":"全车","window_one_key_lift_0":"主驾驶位"}},"window_anti_clip_function":{"text":"车窗防夹手功能"},"exter_mirror_functional":{"text":"外后视镜功能","sub_list":{"exter_mirror_elec_adjustment":"电动调节","external_mirror_heat":"加热","outside_mirror_memory":"记忆","outside_mirror_electric_folding":"电动折叠","external_mirror_auto_flip_v2":"倒车自动下翻","external_mirror_auto_fold_v2":"锁车自动折叠","exter_mirror_auto_prev_glare":"自动防眩目"}},"inside_mirror_functional":{"text":"内后视镜功能","sub_list":{"inside_mirror_auto_anti_glare":"自动防眩目","stream_media_inside_mirror":"流媒体"}},"car_window_sunshade_mirror":{"text":"车内化妆镜","sub_list":{"main_drive_window_sunshade_mirror_v2":"主驾化妆镜","vice_drive_window_sunshade_mirror_v2":"副驾化妆镜","rear_makeup_mirror_v2":"后排化妆镜"}},"backside_privacy_glass":{"text":"后排隐私玻璃"},"window_sunshade":{"text":"车内遮阳帘","sub_list":{"rear_window_sunshade":"后窗侧遮阳帘","rear_windshield_sunshade":"后风挡遮阳帘"}},"rain_induction_wiper":{"text":"雨量感应式雨刷"},"rear_wiper":{"text":"后雨刷"},"heated_nozzle_v3":{"text":"可加热喷水嘴"},"multilayer_soundproof_glass_v2":{"text":"多层隔音玻璃","sub_list":{"multilayer_soundproof_glass_v2_1":"前排","multilayer_soundproof_glass_v2_3":"全车","multilayer_soundproof_glass_v2_2":"multilayer_soundproof_glass_v2_2"}},"rear_window_open_method_3":{"text":"后窗玻璃开启"}},"空调/冰箱-tf":{"rear_independent_air_conditioning":{"text":"后排独立空调"},"rear_exhaust":{"text":"后排出风口"},"air_purification":{"text":"车内空气调节/花粉过滤"},"car_purifier_v3":{"text":"车载空气净化器"},"pm25_filtrating_equipment_v2":{"text":"车内PM2.5过滤装置"},"negative_ion_generator_v2":{"text":"负离子发生器"},"car_fragrance_device_v2":{"text":"车内香氛装置"},"car_refrigerator":{"text":"车载冰箱"},"air_control_model":{"text":"空调控制方式","sub_list":{"air_control_model_2":"自动","air_control_model_1":"手动"}},"temperature_partition_control":{"text":"温度分区控制","sub_list":{"temperature_partition_control_1":"双区空调","temperature_partition_control_2":"三区空调","temperature_partition_control_3":"四区空调"}}},"选装包-tf":{"":{"text":"暗夜选装包","sub_list":{"暗夜选装包_1":"暗夜选装包_1","暗夜选装包_2":"暗夜选装包_2","智行导航选装包_1":"智行导航选装包_1","智行导航选装包_2":"智行导航选装包_2","选装包2_1":"选装包2_1","选装包2_2":"选装包2_2","选装包3_1":"选装包3_1","选装包3_2":"选装包3_2","选装包4_1":"选装包4_1","选装包4_2":"选装包4_2","专属定制刺绣_1":"专属定制刺绣_1","专属定制刺绣_2":"专属定制刺绣_2","智能语音机器人_1":"智能语音机器人_1","智能语音机器人_2":"智能语音机器人_2","智能音箱_1":"智能音箱_1","智能音箱_2":"智能音箱_2","青春车衣选装包_1":"青春车衣选装包_1","青春车衣选装包_2":"青春车衣选装包_2","高级皮质选装包_1":"高级皮质选装包_1","高级皮质选装包_2":"高级皮质选装包_2","科技选装包_1":"科技选装包_1","科技选装包_2":"科技选装包_2","RS套件燃速型装备包_1":"RS套件燃速型装备包_1","RS套件燃速型装备包_2":"RS套件燃速型装备包_2","导航包_1":"导航包_1","导航包_2":"导航包_2","三元锂电池_1":"三元锂电池_1","三元锂电池_2":"三元锂电池_2","科技包_1":"科技包_1","科技包_2":"科技包_2","舒适包_1":"舒适包_1","舒适包_2":"舒适包_2","比亚迪黑科技包_1":"比亚迪黑科技包_1","比亚迪黑科技包_2":"比亚迪黑科技包_2","ADAS1.5智能选装_1":"ADAS1.5智能选装_1","ADAS1.5智能选装_2":"ADAS1.5智能选装_2","ADAS2.0智能选装_1":"ADAS2.0智能选装_1","ADAS2.0智能选装_2":"ADAS2.0智能选装_2","科技驾控GT运动套装_1":"科技驾控GT运动套装_1","科技驾控GT运动套装_2":"科技驾控GT运动套装_2","科技驾控品质套装_1":"科技驾控品质套装_1","科技驾控品质套装_2":"科技驾控品质套装_2","科技驾控夜视套装_1":"科技驾控夜视套装_1","科技驾控夜视套装_2":"科技驾控夜视套装_2","全自动泊车系统_1":"全自动泊车系统_1","全自动泊车系统_2":"全自动泊车系统_2","科技安全包_1":"科技安全包_1","科技安全包_2":"科技安全包_2","舒适选装包1_1":"舒适选装包1_1","舒适选装包1_2":"舒适选装包1_2","舒适选装包2_1":"舒适选装包2_1","舒适选装包2_2":"舒适选装包2_2","ETC接口_1":"ETC接口_1","ETC接口_2":"ETC接口_2","增强型互联出行配置_1":"增强型互联出行配置_1","增强型互联出行配置_2":"增强型互联出行配置_2","泊车套装_1":"泊车套装_1","泊车套装_2":"泊车套装_2","温暖套装_1":"温暖套装_1","温暖套装_2":"温暖套装_2","进阶型互联出行配置_1":"进阶型互联出行配置_1","进阶型互联出行配置_2":"进阶型互联出行配置_2","ETC_1":"ETC_1","ETC_2":"ETC_2","一键遥控泊车_1":"一键遥控泊车_1","一键遥控泊车_2":"一键遥控泊车_2","个性外观套件_1":"个性外观套件_1","个性外观套件_2":"个性外观套件_2","双色车顶_1":"双色车顶_1","双色车顶_2":"双色车顶_2","奢享尊贵套装_1":"奢享尊贵套装_1","奢享尊贵套装_2":"奢享尊贵套装_2","舒享套装_1":"舒享套装_1","舒享套装_2":"舒享套装_2","超视距记忆泊车_1":"超视距记忆泊车_1","超视距记忆泊车_2":"超视距记忆泊车_2","3D全息虚拟影像_1":"3D全息虚拟影像_1","3D全息虚拟影像_2":"3D全息虚拟影像_2","选装包_1":"选装包_1","选装包_2":"选装包_2","Trophy专属运动套件_1":"Trophy专属运动套件_1","Trophy专属运动套件_2":"Trophy专属运动套件_2","安全包_1":"安全包_1","安全包_2":"安全包_2","选装包1_1":"选装包1_1","选装包1_2":"选装包1_2","马牌轮胎_1":"马牌轮胎_1","马牌轮胎_2":"马牌轮胎_2","运动套件包_1":"运动套件包_1","运动套件包_2":"运动套件包_2","智能安全包_1":"智能安全包_1","智能安全包_2":"智能安全包_2","空调制暖_1":"空调制暖_1","空调制暖_2":"空调制暖_2","行政选配_1":"行政选配_1","行政选配_2":"行政选配_2","安全气囊套装_1":"安全气囊套装_1","安全气囊套装_2":"安全气囊套装_2","智能互联套装_1":"智能互联套装_1","智能互联套装_2":"智能互联套装_2","智能享受套装_1":"智能享受套装_1","智能享受套装_2":"智能享受套装_2","智能安全套装_1":"智能安全套装_1","智能安全套装_2":"智能安全套装_2","智能操控套装B_1":"智能操控套装B_1","智能操控套装B_2":"智能操控套装B_2","智能享受套_1":"智能享受套_1","智能享受套_2":"智能享受套_2","一键启动+发动机防盗_1":"一键启动+发动机防盗_1","一键启动+发动机防盗_2":"一键启动+发动机防盗_2","主驾电动6向+前排座椅加热_1":"主驾电动6向+前排座椅加热_1","主驾电动6向+前排座椅加热_2":"主驾电动6向+前排座椅加热_2","发动机下护板+油箱下护板_1":"发动机下护板+油箱下护板_1","发动机下护板+油箱下护板_2":"发动机下护板+油箱下护板_2","四轮盘刹+ESP+265/60R18_1":"四轮盘刹+ESP+265/60R18_1","四轮盘刹+ESP+265/60R18_2":"四轮盘刹+ESP+265/60R18_2"}}},"特色配置-tf":{"":{"text":"自主路线寻迹倒车","sub_list":{"自主路线寻迹倒车_1":"自主路线寻迹倒车_1","自主路线寻迹倒车_2":"自主路线寻迹倒车_2","一键遥控泊车_1":"一键遥控泊车_1","一键遥控泊车_2":"一键遥控泊车_2","车内生命体征监测系统_1":"车内生命体征监测系统_1","车内生命体征监测系统_2":"车内生命体征监测系统_2","全息透明影像系统_1":"全息透明影像系统_1","全息透明影像系统_2":"全息透明影像系统_2","自适应旋转悬浮Pad_1":"自适应旋转悬浮Pad_1","自适应旋转悬浮Pad_2":"自适应旋转悬浮Pad_2","CCO越野巡航_1":"CCO越野巡航_1","CCO越野巡航_2":"CCO越野巡航_2","TAB坦克转弯_1":"TAB坦克转弯_1","TAB坦克转弯_2":"TAB坦克转弯_2","坦克转弯模式_1":"坦克转弯模式_1","坦克转弯模式_2":"坦克转弯模式_2","540°智能影像（透明底盘）_1":"540°智能影像（透明底盘）_1","540°智能影像（透明底盘）_2":"540°智能影像（透明底盘）_2","超长距离记忆泊车（HAVP）_1":"超长距离记忆泊车（HAVP）_1","超长距离记忆泊车（HAVP）_2":"超长距离记忆泊车（HAVP）_2","AR增强实景导航_1":"AR增强实景导航_1","AR增强实景导航_2":"AR增强实景导航_2","AR导航_1":"AR导航_1","AR导航_2":"AR导航_2","透明底盘_1":"透明底盘_1","透明底盘_2":"透明底盘_2","UVC深紫外线空调杀毒系统_1":"UVC深紫外线空调杀毒系统_1","UVC深紫外线空调杀毒系统_2":"UVC深紫外线空调杀毒系统_2","航空座椅_1":"航空座椅_1","航空座椅_2":"航空座椅_2"}}}}'),{getScrollTarget:k,setVerticalScrollPosition:z}=g.ZP,j=(0,r.aZ)({name:"MainLayout",setup(){const e=(0,y.Z)();e.loading.show({message:"加载汽车数据中...",delay:400}),console.log("file:///E:/SD/car_filter/src/layouts/MainLayout.vue%3Fvue&type=script&lang=js");const _=new Worker(new URL(t.p+t.u(239),t.b),{type:void 0});var r=null;_.onmessage=_=>{r=new f.DataFrame(_.data.car_info),i.value=_.data.property_value_set,v(),e.loading.hide()},_.postMessage({json_links:["/assets/car_info_1.json","/assets/car_info_2.json","/assets/car_info_3.json"]}),w["基本信息"].car_year={text:"年份"},w["基本信息"].dealer_price={text:"经销商报价"};let a=JSON.parse(JSON.stringify(w));const s=(0,b.qj)({property_group_refined:a,car_info_filtered:{},series_num:0,car_num:0}),i=(0,b.iH)({});let o={};for(let t in w){o[t]={};for(const[e,_]of Object.entries(w[t]))t.endsWith("-tf")?o[t][e]="sub_list"in _&&[]:o[t][e]=[]}const n=(0,b.qj)(o),l=(0,b.qj)({}),c=(0,b.qj)({}),d=(e,_,t,r,a)=>{if("boolean"===typeof _)!0===_?(l[e]=!0,c[e]={key:e,text:r,group_name:a}):(delete l[e],delete c[e]);else if("object"===typeof _)if(0===_.length)delete l[e],delete c[e];else if(l[e]={isRawValue:t,value:_},t)for(const s of _)c[s]={text:`${r}: ${s}`,isRawValue:t,key:e,group_name:a};else for(const s of _)c[s["option"]]={text:`${r}: ${s["label"]}`,isRawValue:t,parent:e,group_name:a};else"number"===typeof _&&(l[e]={isRawValue:t,value:_},c[e]={text:`${r}: ${_} 万以下`,isRawValue:t,group_name:a});v()},u=e=>{"string"===typeof e["value"]?delete c[e["value"]]:delete c[e["value"]["option"]]},p=(e,_)=>{if(delete c[e],"isRawValue"in _)if(!0===_["isRawValue"])if("dealer_price"===e)delete l[e],n[_["group_name"]][e]=null;else{const t=n[_["group_name"]][_["key"]].indexOf(e);n[_["group_name"]][_["key"]].splice(t,1)}else{const t=n[_["group_name"]][_["parent"]].indexOf(e);n[_["group_name"]][_["parent"]].splice(t,1)}else delete l[e],n[_["group_name"]][e]=!1;v()},m=()=>{v();let e=document.getElementById("head");const _=document.getElementById("carInfo"),t=k(_),r=_.offsetTop-e.offsetHeight,a=300;z(t,r,a)},v=()=>{let e=r;if(Object.keys(l).length>0&&Object.keys(l).forEach((_=>{if(0==e.size)return;e.reset_index({inplace:!0});const t=l[_];if(!0===t)e=e.iloc({rows:e[_].str.includes("●")});else if(t.isRawValue)if("dealer_price"===_)e=e.iloc({rows:e["dealer_price_value"].le(t.value)});else{let r=null;for(const a of t.value){const t=e[_].eq(a);r=null===r?t:r.or(t)}null!==r&&(e=e.iloc({rows:r}))}else{let _=null;for(const r of t.value){const t=e[r["option"]].str.includes("●");_=null===_?t:_.or(t)}null!==_&&(e=e.iloc({rows:_}))}})),0==e.size)return s["car_info_filtered"]={},s["series_num"]=0,void(s["car_num"]=0);const _=["series_name","car_year","car_name","dealer_price"];e=e.loc({columns:_});const t=e.groupby(["series_name"]),a=t.col_dict;let i={};for(const r in a){const e=[];a[r].forEach((_=>{e.push({car_year:_[1],car_name:_[2],dealer_price:_[3]})})),i[r]=e}s["car_info_filtered"]=i,s["series_num"]=Object.keys(i).length,s["car_num"]=t.data.length};return{data:s,property_filter:n,property_filter_list:l,property_filter_display:c,property_value_set:i,updatePropertyFilterList:d,removePropertyFilter:u,removeProperty:p,scrollToCarInfo:m,applyFilter:v}}});var C=t(74260),A=t(83066),D=t(53812),q=t(39570),V=t(67030),S=t(64607),R=t(72652),P=t(36270),T=t(92680),L=t(34842),W=t(10151),E=t(25589),B=t(27011),O=t(83414),H=t(52035),U=t(2350),Z=t(7518),F=t.n(Z);const I=(0,C.Z)(j,[["render",h]]),N=I;F()(j,"components",{QLayout:A.Z,QHeader:D.Z,QToolbar:q.Z,QChip:V.Z,QBtn:S.Z,QPageContainer:R.Z,QSelect:P.Z,QCheckbox:T.Z,QInput:L.Z,QCard:W.Z,QCardSection:E.Z,QList:B.Z,QItem:O.Z,QItemSection:H.Z,QItemLabel:U.Z})},75410:()=>{},48628:()=>{},31601:()=>{},67792:()=>{},34977:()=>{},52007:()=>{},75042:()=>{},55382:()=>{},72095:()=>{},61219:()=>{}}]);