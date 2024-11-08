import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  showDateTimePicker: boolean;
  toggleDatePicker: () => void;
  date: Date;
  confirmIosDatePicker: () => void;
  selectedDate: string;
  dispatch: React.Dispatch<any>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

const DatePicker = ({
  selectedDate,
  showDateTimePicker,
  toggleDatePicker,
  date,
  confirmIosDatePicker,
  dispatch,
  setDate,
  setSelectedDate,
}: Props) => {
  const onDatePickerChange = ({ type }: any, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      console.log("Selected Date:", currentDate);
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setSelectedDate(currentDate.toDateString());
        dispatch({ type: "SET_DATE", value: currentDate.getTime() }); // Store as timestamp
      }
    } else {
      toggleDatePicker();
    }
  };
  return (
    <>
      {showDateTimePicker && (
        <DateTimePicker
          mode="date"
          value={date}
          display="spinner"
          onChange={onDatePickerChange}
        />
      )}

      {!showDateTimePicker && (
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            value={selectedDate}
            style={styles.descriptionInput}
            onChangeText={(text) =>
              dispatch({ type: "Set_DATE", value: text || Date.now() })
            }
            placeholder="Date and Time"
            placeholderTextColor="gray"
            editable={false}
            onPressIn={toggleDatePicker}
          />
        </Pressable>
      )}
      {Platform.OS === "ios" && showDateTimePicker && (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity onPress={toggleDatePicker}>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                padding: 10,
                fontWeight: "bold",
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmIosDatePicker}>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                padding: 10,
                fontWeight: "bold",
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  descriptionInput: {
    marginBottom: 15,
    fontSize: 15,
  },
});

export default DatePicker;
