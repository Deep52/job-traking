PGDMP         )                z           job-tracking    14.1    14.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24850    job-tracking    DATABASE     s   CREATE DATABASE "job-tracking" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE "job-tracking";
                postgres    false            �            1259    33071    course    TABLE     �   CREATE TABLE public.course (
    id integer NOT NULL,
    course_full_name character varying(300),
    couse character varying(200),
    dept_id integer NOT NULL,
    level character varying(200) NOT NULL
);
    DROP TABLE public.course;
       public         heap    postgres    false            �            1259    33070    course_id_seq    SEQUENCE     �   ALTER TABLE public.course ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.course_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    214            �            1259    33063 
   department    TABLE     �   CREATE TABLE public.department (
    id integer NOT NULL,
    dept_full_name character varying(200) NOT NULL,
    dept character varying(200) NOT NULL,
    s_date character varying(200)
);
    DROP TABLE public.department;
       public         heap    postgres    false            �            1259    33062    department_id_seq    SEQUENCE     �   ALTER TABLE public.department ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    212            �            1259    33043    login    TABLE     }  CREATE TABLE public.login (
    id integer NOT NULL,
    "fname " character(250),
    lname character(250),
    email character varying(250),
    password character varying(400),
    type character varying(200),
    "start-date" time(6) without time zone,
    "end-date" time(6) without time zone,
    salt character varying(200),
    twofa boolean,
    access integer NOT NULL
);
    DROP TABLE public.login;
       public         heap    postgres    false            �            1259    33042    login_id_seq    SEQUENCE     �   ALTER TABLE public.login ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.login_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    210            �          0    33071    course 
   TABLE DATA           M   COPY public.course (id, course_full_name, couse, dept_id, level) FROM stdin;
    public          postgres    false    214   �       �          0    33063 
   department 
   TABLE DATA           F   COPY public.department (id, dept_full_name, dept, s_date) FROM stdin;
    public          postgres    false    212   K       �          0    33043    login 
   TABLE DATA           z   COPY public.login (id, "fname ", lname, email, password, type, "start-date", "end-date", salt, twofa, access) FROM stdin;
    public          postgres    false    210   �                  0    0    course_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.course_id_seq', 3, true);
          public          postgres    false    213                       0    0    department_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.department_id_seq', 2, true);
          public          postgres    false    211                       0    0    login_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.login_id_seq', 1, false);
          public          postgres    false    209            k           2606    33077    course course_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.course DROP CONSTRAINT course_pkey;
       public            postgres    false    214            i           2606    33069    department department_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.department DROP CONSTRAINT department_pkey;
       public            postgres    false    212            g           2606    33047    login login_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.login DROP CONSTRAINT login_pkey;
       public            postgres    false    210            �   F   x�3��vVpL)K�KNUp��-(-I-RN�L
@$��99ܹ��\�j`J��<�ĒDi�t� �G�      �   A   x�3�t��-(-I-RN�L�KN�t��4202�50�50�2�t*-��K-.��urD�Xr��qqq ]�X      �      x������ � �     