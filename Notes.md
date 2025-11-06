- U used this below in useGetArray Hook for field in schema of type Array of objects , the type allows you to have the fieldName as the fields name of the schema like the attribute name from the component FormField, maybe you can do a similar thing to video and image input components and use Hooks, also make the type betwwen brakeckts <> gneric so you pass the type of the schema and you have to repsect it when passing the field name
- fieldName: UseFieldArrayProps<SchoolStudentsNoID>['name'];

- The table from Volto admin in the user page is good and resuable, steal that shit, and make the logic in a use hook
