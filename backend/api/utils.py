import xml.etree.ElementTree as E


def navigate_xml(node: E.Element, prefix_attributes, prefix_text):
    result = {}

    # attributes
    for attr in node.attrib:
        result[prefix_attributes + attr] = node.attrib[attr]

    # children nodes
    for child in node:
        if child.tag not in result:
            result[child.tag] = navigate_xml(child, prefix_attributes, prefix_text)
        else:
            # is an array
            current = result[child.tag]
            result[child.tag] = [current]
            result[child.tag].append(
                navigate_xml(child, prefix_attributes, prefix_text)
            )

    # text
    if node.text is not None and node.text.strip() != "":
        result[prefix_text + "text"] = node.text.strip()

    return result


def xml_to_json(document, prefix_attributes="@", prefix_text="#"):
    try:
        root = E.fromstring(document)
        result = navigate_xml(root, prefix_attributes, prefix_text)
        return result
    except E.ParseError as e:
        print("Handling ParseError:", e)
        return {}
    except Exception as err:
        print("Handling run-time error:", err)
        return {}
    except:
        return {}


def xml_pretty(document: str) -> str:
    try:
        root = E.fromstring(document)
        E.indent(root)
        return E.tostring(root, encoding="unicode")
    except E.ParseError as e:
        print("Handling ParseError:", e)
        return document
    except Exception as err:
        print("Handling run-time error:", err)
        return document
    except:
        return document
