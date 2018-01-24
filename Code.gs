/**

    Copyright (C) 2018 Ernie Arrowsmith

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
**/

function birthdayCalMain() {

  // Set up the events list spreadsheet to target
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var eventSheet = spreadsheet.getSheetByName("Events");
  var numRows = eventSheet.getLastRow();
  var range = eventSheet.getRange(2, 1, numRows, 5);
  var rangeValues = range.getValues();
 
  // Read the configuration spreadsheet
  var configSheet = spreadsheet.getSheetByName("Config");
  var config = configSheet.getRange(1, 2, 4, 1).getValues();
  
  var calendarToWrite = CalendarApp.getCalendarsByName(config[0])[0];// This looks for calendars matching the name defined in the config tab. Note that because multiple calendars may be returned, this defaults to the first one found.
  
  var eventTitle = "";
  var personName = "";
  var dob = "";
  var eventType = "";
  var calEventList = [];
  
  // Iterate through events list
  for(var i = 0; i < numRows-1; i++)
  {
    
    // Reset the calendar events list
    calEventList = [];
    
    var rowToProcess = rangeValues[i];
    
    // Only process this row if it hasn't been processed before.
    if(rowToProcess[3] == "N" || rowToProcess[3] == "n")
    {
      personName = rowToProcess[0];
      dob = rowToProcess[1];
      eventType = rowToProcess[2];
      
      // Call function to generate event content. 
      var calendarEventContent = generateEventContent(personName,dob,eventType,config);
      
      // Iterate through event content array, calling the function to create calendar events
      for(item in calendarEventContent)
      {
        var eventId = createCalendarEvent(calendarEventContent[item], calendarToWrite); // This function creates a calendar event with the given info then returns the ID for the created event
        calEventList.push(eventId); // Append the event ID to the event ID list for this particular set of events
      }
      
      // Update the spreadsheet to indicate that this has been processed and write the list of event IDs associated with that row.      
      eventSheet.getRange(i+2,4).setValue("Y"); 
      eventSheet.getRange(i+2,5).setValue(calEventList.toString());
    }
    
    // If the user sets this value to "D", we need to delete all the events previously created against that row
    else if(rowToProcess[3] == "D" || rowToProcess[3] == "d")
    {
      var eventsToDelete = rowToProcess[4].split(",");
      
      deleteCalendarEvents(calendarToWrite,eventsToDelete);
      
      eventSheet.getRange(i+2, 4).setValue("DELETED");
      eventSheet.getRange(i+2, 5).clear();
    }
    else
      Logger.log(rangeValues[i][0] + " events already processed");
  }
}

/**
*   This function is responsible for creating the event content based on the person's name, the DOB/anniversary start date, the event type and some info contained in the config tab.
*/
function generateEventContent(name,rawStartDate,type, config)
{
  var maxYears = 100;
  var age = 0;
  var startDate = new Date(rawStartDate);
  var month = startDate.getMonth();
  var day = startDate.getDate();
  var startYear = startDate.getFullYear();
  var eventDate;
  var eventTitle;
  var eventIdList = [];
  var eventContentArray = [];
  
  // This determines how many years the event should be created for based on an arbitrary maximum, and also configures the first event's title.
  if(type=="Birthday")
  {
    maxYears = config[2];
    eventContentArray.push([name + " was born!",startDate]);
  }
  else if(type=="Anniversary")
  {
    maxYears = config[3];
    eventContentArray.push([name + " got married!",startDate]);
  }
  else if(type=="Test")
  {
    maxYears = 2;
    eventContentArray.push([name + " started testing!",startDate]);
  }
  
  
  // Iterate through all subsequent years, forming the correct date and event title, and adding these to a 2D array.
  for(var i=1; i<maxYears; i++)
  { 
    eventDate = new Date(startYear + i, month, day);
    
    if(type=="Birthday")
    {
      eventTitle = name + " turns " + i + " years old!";
    }
    else if(type=="Anniversary")
    {
      eventTitle = name + "'s " + i + " anniversary!";
      
    }
    else if(type=="Test")
    {
      eventTitle = name + "'s " + i + " test event.";
    }
    
    eventContentArray.push([eventTitle, eventDate]);
  } 
  
  return eventContentArray;
}



function createCalendarEvent(content, calendar)
{
  var eventTitle = content[0];
  var eventDate = content[1];
  
  // Create event using the content generated previously
  var event = calendar.createAllDayEvent(eventTitle,eventDate);
  
  // Return the event ID so that it can be appended to the event ID list
  return event.getId();
}

function deleteCalendarEvents(calendar, eventIds)
{
  // Iterate through all event IDs
  for(i in eventIds)
  {
    // Retrieve the event associated with this ID
    var eventToDelete = calendar.getEventById(eventIds[i]);
  
    // Delete the event
    eventToDelete.deleteEvent();
  }
}

/*function createCalendar(calendarName)
{
  var birthdayCalendar = CalendarApp.createCalendar(calendarName);
  Logger.log("Calendar name = " + birthdayCalendar.getName());
}*/