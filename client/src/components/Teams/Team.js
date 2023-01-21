import "./doctor.scss"
import MyDatatable from "./MyDatatable"
// import Sidebar from "../../components/sidebar/Sidebar"
// import Navbar from "../../components/navbar/Navbar"
// import Datatable from "../../components/datatable/Datatable"

const Team = () => {

// const arr = data.map((data, index) => {
//     var doctorId = data._id;
//     return (
//       <View style={styles.singledoc} key={index}>
//         <View style={styles.top}>
//           <Image source={require('../assets/img/doctor.png')} style={{ width: 128, height: 128 }} />
//           <View>
//             <Text style={styles.dochead}>{data.name}</Text>
//             <Text style={styles.docdetail}>{data.email}</Text>
//             <Text style={styles.completed}>Upcoming</Text>
//           </View>
//           <View>
//             <Text style={styles.date}>Date</Text>
//             <Text style={styles.time}>Time</Text>
//           </View>
//         </View>
//         <View style={styles.bottom}>
//           {/* <TouchableOpacity style={styles.cancelbtn}>
//             <Text style={styles.canceltxt} onPress={() => deletedata(doctorId)}>
//               Cancel Appointment
//             </Text>
//           </TouchableOpacity> */}
//           <TouchableOpacity style={styles.cancelbtn}>
//             <Text style={styles.canceltxt} onPress={() => showAlert(doctorId)}>
//               Cancel Appointment
//             </Text>
//           </TouchableOpacity>
//           {/* <TouchableOpacity style={styles.cancelbtn}>
//             <Text style={styles.canceltxt} onPress={()=>showAlert(doctorId)}>
//               Cancel Appointment
//             </Text>
//           </TouchableOpacity> */}
//           <TouchableOpacity style={styles.resbtn}>
//             <Text
//               style={styles.restxt}
//               onPress={() => {
//                 /* 1. Navigate to the Details route with params */
//                 navigation.navigate('Update', {
//                   id:doctorId,
//                   name: data.name,
//                   email: data.email,
//                 });
//               }}
//             >
//               Reschedule Appointment
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   });
  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        {/* <Navbar/> */}
        <MyDatatable />
      </div>
    </div>
  )
}

export default Team