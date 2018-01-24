# Birthday/Anniversary Calendar Event Creator
This Google Script application is designed to automatically populate a Google Calendar with birthday and anniversary events. The user simply adds their friends and families to this spreadsheet, then with a click of a button the application does the rest.

You can find an example spreadsheet here: https://docs.google.com/spreadsheets/d/1UB3x4x3we-IrEKIogmkhqFAaIeJ88WKNpCDxDrvaQ98/edit?usp=sharing

# Adding Script to Google Docs #

Before you can use the script, you will need to add it to your Google Sheet document:
1. Open the document

2. Select "Tools" > "Script Editor"

3. Copy the contents of "Code.gs" from this repository into the script editor

4. Save the project with any name you choose.

# Configuring the Application #

1. Go to "Config" tab

2. Enter the name of the calendar you want to write the events to, e.g. for my own uses, I created a calendar in my account called "Awesome Birthday Calendar". Note that this MUST exactly match the name of a calendar that you have in your Google Account. If you require assistance in creating a calendar please visit the Google support page: https://support.google.com/calendar/answer/37095?hl=en

3. Ignore the "Calendar ID" field for now as it is a placeholder.

4. Determine how many years you want to add for each Birthday. The default is 100, which means if the person is born on 1st January 2000, it will create events for 1st January 2000 through to 1st January 2099.

5. Do the same for Anniversaries.

6. You are now all set to start using the tool!



# Adding Events #

1. Enter the person's name (or peoples' names, for an anniversary) in the name column

2. Enter the person's date of birth, or wedding date, in the date column

3. Select an event type

4. In the "Has this event been processed" column select "N"

5. Press "Update Calendar"

6. It may take some time, especially if you are running this for multiple sets of events. Eventually, you will see the "Has this event been processed" value change to "Y".

7. Data will be written to the "EventIds" column. DO NOT TOUCH THIS!! If you modify or delete any of this data, the application will not be able to automatically delete events if you wish to do so in the future.

8. Check your calendar, it should now show the birthday or anniversary events!


# Deleting Events #

1. If you wish to delete the events that were created for a certain person / people, in the "Has this event been processed" column select "D"

2. Press "Update Calendar"

3. It may take some time, especially if you are running this for multiple sets of events. Eventually, you will see the "Has this event been processed" value change to "DELETED".

4. The data will in the "EventIds" column will have been erased.

5. Check your calendar, the events should have been deleted.


## Attributions ##
This work is entirely my own. However, its creation was influenced by a prior work implemented by William Jackson in Python: https://github.com/williamjacksn/birthdayfeed
