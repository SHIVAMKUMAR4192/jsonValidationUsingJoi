import { errorResponseForXSD, validateXMLAgainstXSD } from '../validation/xsdSchemaValidation';

const xsdSchema = `<?xml version="1.0" encoding="UTF-8" ?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="user">
        <xs:complexType>
            <xs:all>
                <xs:element name="id" type="xs:integer" />
                <xs:element name="first_name">
                    <xs:simpleType>
                        <xs:restriction base="xs:string">
                            <xs:minLength value="2" />
                        </xs:restriction>
                    </xs:simpleType>
                </xs:element>
                <xs:element name="last_name">
                    <xs:simpleType>
                        <xs:restriction base="xs:string">
                            <xs:minLength value="2" />
                        </xs:restriction>
                </xs:simpleType>
                </xs:element>
                <xs:element name="phNumber" type="xs:string" />
                <xs:element name="created_at" type="xs:dateTime" />
            </xs:all>
        </xs:complexType>
    </xs:element>
</xs:schema>`;

const validXmlData = `<?xml version="1.0" encoding="UTF-8"?>
<user>
    <id>1</id>
    <first_name>John</first_name>
    <last_name>Doe</last_name>
    <phNumber>123-456-7890</phNumber>
    <created_at>2023-10-30T08:00:00Z</created_at>
</user>`;

const invalidXmlData = `this is not valid xml data`;  

describe('XML Schema Validation Tests', () => {
  it('should validate XML data against a valid XSD schema', () => {
    const result = validateXMLAgainstXSD(xsdSchema, validXmlData);
    expect(result).toBe(true);
  });

  it('should handle invalid XML data', () => {
    const capturedError = () => {
      try {
        validateXMLAgainstXSD(xsdSchema, invalidXmlData);
      } catch (error) {
        return error;
      }
    };
    
    expect(capturedError).toBeDefined();
    if (capturedError()){
        const expectedErrorMessage = "start tag expected, '<' not found";
        const actualErrorMessage = capturedError().message.toLowerCase(); 
        expect(actualErrorMessage).toContain(expectedErrorMessage.toLowerCase()); 
    }
  });

  it('should handle invalid XSD schema', () => {
    const invalidXsdSchema = `Invalid XSD Schema`;
    const capturedError = () => {
      try {
        validateXMLAgainstXSD(invalidXsdSchema, validXmlData);
      } catch (error) {
        return error;
      }
    };
  
    expect(capturedError).toBeDefined();
    const expectedErrorMessage = "Start tag expected, '<' not found"; // Adjust this to match the actual error message
    expect(capturedError().message).toContain(expectedErrorMessage);
  });
  
});
